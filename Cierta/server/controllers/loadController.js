const Load = require("../models/Load");
const { sendStatusUpdateEmail } = require("../utils/mailer");
const { s3Put, getSignedGetUrl, s3Delete } = require("../utils/s3");
const { s3KeyForLoadImage } = require("../utils/s3Keys");


async function uploadFilesToS3(files = [], _loadId, _kind) {
  const keys = [];
  for (const file of files) {
    const isGif = file.mimetype === "image/gif";
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${isGif ? ".gif" : ".webp"}`;
    const Key = `uploads/blogs/${filename}`;

    const Body = file.buffer; 
    const ContentType = isGif ? "image/gif" : "image/webp";

    await s3Put({ Key, Body, ContentType });
    keys.push(Key);       
  }
  return keys;
}
exports.getAllLoads = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { companyName } = req.user;

  if (!companyName && req.user.role === "partner") {
    return res.status(404).json({ message: "No loads found" });
  } else if (!companyName && req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const query = companyName ? { companyName } : {};

  try {
    const [loads, total] = await Promise.all([
      Load.find(query).skip(skip).limit(limit).lean(),
      Load.countDocuments(query),
    ]);

    if (!loads || loads.length === 0) {
      return res.status(404).json({ message: "No loads found" });
    }

    res.json({
      loads,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get loads",
      error: err.message,
    });
  }
};

exports.searchLoads = async (req, res) => {
  try {
    const { vin } = req.query;
    if (!vin) {
      return res.status(400).json({ message: "VIN parameter is required" });
    }

    const load = await Load.findOne({
      Vin: { $regex: new RegExp(`^${vin}$`, "i") },
    }).lean();

    if (load) load.id = load._id.toString();

    res.json(load ? [load] : []);
  } catch (err) {
    res.status(500).json({
      message: "Failed to search loads",
      error: err.message,
    });
  }
};

exports.createLoad = async (req, res) => {
  try {
    const loadData = req.body.data ? JSON.parse(req.body.data) : req.body;

    const errors = [];
    const requiredFields = [
      "Vin",
      "type",
      "carrier.name",
      "pickUpLocation.city",
      "pickUpLocation.state",
      "deliveryLocation.city",
      "deliveryLocation.state",
    ];

    requiredFields.forEach((field) => {
      const parts = field.split(".");
      let value = loadData;
      parts.forEach((part) => (value = value?.[part]));
      if (!value) errors.push(`${field.replace(".", " ")} is required`);
    });

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const loadIdTemp = loadData.Vin || "tmp"; // для ключей до сохранения

    let images = [];
    let carrierImageFiles = [];

    if (req.files) {
      if (req.files.images?.length) {
        images = await uploadFilesToS3(req.files.images, loadIdTemp, "vehicle");
      }
      if (req.files.carrierImageFile?.length) {
        carrierImageFiles = await uploadFilesToS3(
          req.files.carrierImageFile,
          loadIdTemp,
          "carrier"
        );
      }
    }

    const newLoad = await Load.create({
      ...loadData,
      Vin: loadData.Vin.toUpperCase(),
      images,
      carrier: {
        ...loadData.carrier,
        carrierImageFile: carrierImageFiles,
      },
    });

    if (Array.isArray(loadData.costomerEmail) && loadData.costomerEmail.length > 0) {
      try {
        sendStatusUpdateEmail({ ...loadData }, "Pending", loadData.status);
      } catch (emailError) {
        console.error("Email send error:", emailError);
      }
    }

    res.status(201).json(newLoad);
  } catch (err) {
    let response = {
      message: "Failed to create load",
      error: err.message,
    };
    let statusCode = 500;

    if (err.code === 11000) {
      statusCode = 409;
      response.message = "Duplicate VIN error";
      response.details = "A load with this VIN already exists";
    } else if (err.name === "ValidationError") {
      statusCode = 400;
      response.validationErrors = Object.values(err.errors).map((e) => e.message);
    }

    res.status(statusCode).json(response);
  }
};

exports.updateLoad = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body.data ? JSON.parse(req.body.data) : req.body;
    const removedVehicleImages = updates.removedVehicleImages || [];
    const removedCarrierImages = updates.removedCarrierImages || [];

    delete updates.removedVehicleImages;
    delete updates.removedCarrierImages;

    const validStatuses = ["in process", "picked up", "delivered", "cancelled"];
    if (updates.status && !validStatuses.includes(updates.status)) {
      return res.status(400).json({
        message: "Invalid status value",
        validStatuses,
      });
    }

    const oldLoad = await Load.findById(id);
    if (!oldLoad) return res.status(404).json({ message: "Load not found" });

    // Загрузка новых изображений (если пришли)
    let newVehicleImages = [];
    let newCarrierImages = [];

    if (req.files) {
      if (req.files.images?.length) {
        newVehicleImages = await uploadFilesToS3(req.files.images, id, "vehicle");
      }
      if (req.files.carrierImageFile?.length) {
        newCarrierImages = await uploadFilesToS3(
          req.files.carrierImageFile,
          id,
          "carrier"
        );
      }
    }

    // Удаление помеченных изображений из S3
    for (const key of removedVehicleImages) {
      try { await s3Delete(key); } catch (e) { console.error("S3 delete vehicle err:", e); }
    }
    for (const key of removedCarrierImages) {
      try { await s3Delete(key); } catch (e) { console.error("S3 delete carrier err:", e); }
    }

    // Обновление массивов изображений
    updates.images = [
      ...(oldLoad.images || []).filter((k) => !removedVehicleImages.includes(k)),
      ...newVehicleImages,
    ];

    updates.carrier = {
      ...oldLoad.carrier,
      ...updates.carrier,
      carrierImageFile: [
        ...(oldLoad.carrier?.carrierImageFile || []).filter(
          (k) => !removedCarrierImages.includes(k)
        ),
        ...newCarrierImages,
      ],
    };

    if (updates.Vin) {
      updates.Vin = updates.Vin.toUpperCase();
    }

    // Email при изменении статуса
    const statusChanged = updates.status && updates.status !== oldLoad.status;
    if (statusChanged) {
      try {
        sendStatusUpdateEmail(
          { ...oldLoad.toObject(), ...updates },
          oldLoad.status,
          updates.status
        );
      } catch (emailError) {
        console.error("Email send error:", emailError);
      }
    }

    const updatedLoad = await Load.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedLoad) return res.status(404).json({ message: "Load not found" });
    res.json(updatedLoad);
  } catch (err) {
    let response = { message: "Failed to update load", error: err.message };
    let statusCode = 500;

    if (err.name === "ValidationError") {
      statusCode = 400;
      response.validationErrors = Object.values(err.errors).map((e) => e.message);
    } else if (err.code === 11000) {
      statusCode = 409;
      response.message = "Duplicate VIN error";
    }

    res.status(statusCode).json(response);
  }
};

exports.deleteLoad = async (req, res) => {
  try {
    const { id } = req.params;
    const load = await Load.findById(id);

    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }

    // Удаляем все связанные объекты в S3
    const allKeys = [
      ...(load.images || []),
      ...(load.carrier?.carrierImageFile || []),
    ];

    for (const key of allKeys) {
      try { await s3Delete(key); } catch (e) { console.error("S3 delete err:", e); }
    }

    await Load.findByIdAndDelete(id);

    res.json({ message: "Load deleted", deletedId: id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete load", error: err.message });
  }
};

// exports.getLoadImages = async (req, res) => {
//   const load = await Load.findById(req.params.id).lean();
//   if (!load) return res.status(404).json({ message: "Load not found" });
//   const images = await Promise.all((load.images || []).map(async (k) => ({ key: k, url: await getSignedGetUrl(k) })));
//   const carrierImages = await Promise.all((load.carrier?.carrierImageFile || []).map(async (k) => ({ key: k, url: await getSignedGetUrl(k) })));
//   res.json({ images, carrierImages });
// };
