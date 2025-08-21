import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import useLoadService from "../../../../services/loadService";
import { useToast } from "../../../../context/toatsContext";
import { API_URL } from "../../../../helpers";

const LoadForm = ({ initialData, onSubmit, onCancel }) => {
  const { handleToast } = useToast();

  // Состояния формы
  const [formData, setFormData] = useState({
    type: "Cars",
    Vin: "",
    category: "",
    companyName: "",
    buyer: { name: "", contact: "", email: "" },
    carrier: { name: "", contact: "", email: "" },
    pickUpLocation: { city: "", state: "", loc: "", contactPhone: "" },
    deliveryLocation: { city: "", state: "", loc: "", contactPhone: "" },
    deliveryDate: "",
    pickUpDate: "",
    status: "in process",
    costomerEmail: [],
    vehicleDetails: { make: "", model: "", year: "", color: "", mileage: "" },
    specialRequirements: "",
    insurance: false,
    value: "",
    aging: 0,
    tracing: "",
    assignedDate: new Date().toISOString().split("T")[0],
  });

  // Состояния для изображений
  const [existingVehicleImages, setExistingVehicleImages] = useState([]);
  const [newVehicleImages, setNewVehicleImages] = useState([]);
  const [removedVehicleImages, setRemovedVehicleImages] = useState([]);

  const [existingCarrierImages, setExistingCarrierImages] = useState([]);
  const [newCarrierImages, setNewCarrierImages] = useState([]);
  const [removedCarrierImages, setRemovedCarrierImages] = useState([]);

  const [errors, setErrors] = useState({});
  const transportTypes = ["Boats", "Cars", "Motorcycles", "RVs"];
  const statusOptions = ["in process", "picked up", "delivered", "cancelled"];
  const { searchLoads, createLoad, updateLoad, deleteLoad } = useLoadService();

  useEffect(() => {
    if (initialData) {
      // Форматируем данные для формы
      const formattedData = {
        ...initialData,
        deliveryDate: initialData.deliveryDate?.split("T")[0] || "",
        pickUpDate: initialData.pickUpDate?.split("T")[0] || "",
        assignedDate:
          initialData.assignedDate?.split("T")[0] ||
          new Date().toISOString().split("T")[0],
        vehicleDetails: initialData.vehicleDetails || {
          make: "",
          model: "",
          year: "",
          color: "",
          mileage: "",
        },
      };

      setFormData(formattedData);

      // Инициализация изображений
      setExistingVehicleImages(initialData.images || []);
      setExistingCarrierImages(initialData.carrier?.carrierImageFile || []);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updateNestedState = (parent, child, val) => {
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: val },
      }));
    };

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      updateNestedState(parent, child, type === "checkbox" ? checked : value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCarrierImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const validFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file.name)
    );

    if (validFiles.length !== files.length) {
      setErrors({
        ...errors,
        carrierImages: "Only JPG, JPEG, PNG, WEBP formats allowed",
      });
      return;
    }

    setNewCarrierImages((prev) => [...prev, ...validFiles]);
    setErrors({ ...errors, carrierImages: null });
  };

  const removeCarrierImage = (index, type) => {
    if (type === "existing") {
      const removed = existingCarrierImages[index];

      if (existingCarrierImages.length === 1) {
        setRemovedCarrierImages((prev) => [...prev, ...existingCarrierImages]);
        setExistingCarrierImages([]);
      } else {
        setRemovedCarrierImages((prev) => [...prev, removed]);
        setExistingCarrierImages((prev) => prev.filter((_, i) => i !== index));
      }
    } else {
      setNewCarrierImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleVehicleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file.name)
    );

    if (validFiles.length !== files.length) {
      setErrors({ images: "Only JPG, JPEG, PNG, WEBP formats allowed" });
      return;
    }

    setNewVehicleImages((prev) => [...prev, ...validFiles]);
  };

  const removeVehicleImage = (index, type) => {
    if (type === "existing") {
      const removed = existingVehicleImages[index];

      if (existingVehicleImages.length === 1) {
        setRemovedVehicleImages((prev) => [...prev, ...existingVehicleImages]);
        setExistingVehicleImages([]);
      } else {
        setRemovedVehicleImages((prev) => [...prev, removed]);
        setExistingVehicleImages((prev) => prev.filter((_, i) => i !== index));
      }
    } else {
      setNewVehicleImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors = {};
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
      let value = formData;
      parts.forEach((part) => (value = value?.[part]));

      if (!value) newErrors[field] = `${field.replace(".", " ")} is required`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Подготовка данных для отправки
    const dataToSubmit = {
      ...formData,
      // Для обновления передаем удаленные изображения
      ...(initialData && {
        removedVehicleImages,
        removedCarrierImages,
      }),
    };

    // Вызываем функцию onSubmit с данными и файлами
    initialData
      ? updateLoad(
          formData,
          newVehicleImages,
          newCarrierImages,
          removedVehicleImages,
          removedCarrierImages
        )
      : createLoad(formData, newVehicleImages, newCarrierImages);

    handleToast("success", initialData ? "Updated" : "Created");
  };

  // Генерируем URL для превью новых изображений
  const newVehicleImageUrls = newVehicleImages.map((file) =>
    URL.createObjectURL(file)
  );
  const newCarrierImageUrls = newCarrierImages.map((file) =>
    URL.createObjectURL(file)
  );

  const addCustomerEmail = () => {
    setFormData((prev) => ({
      ...prev,
      costomerEmail: [...prev.costomerEmail, ""],
    }));
  };

  const removeCustomerEmail = (index) => {
    setFormData((prev) => ({
      ...prev,
      costomerEmail: prev.costomerEmail.filter((_, i) => i !== index),
    }));
  };

  const handleCustomerEmailChange = (index, value) => {
    setFormData((prev) => {
      const newEmails = [...prev.costomerEmail];
      newEmails[index] = value;
      return { ...prev, costomerEmail: newEmails };
    });
  };

  return (
    <Card className="p-3 mb-4">
      <h4 className="mb-4">{initialData ? "Edit Load" : "Add New Load"}</h4>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          {Object.values(errors).map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>VIN *</Form.Label>
              <Form.Control
                type="text"
                name="Vin"
                value={formData.Vin}
                onChange={handleChange}
                isInvalid={!!errors.Vin}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Vin}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Customer Emails </Form.Label>

              {formData.costomerEmail.map((email, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) =>
                      handleCustomerEmailChange(index, e.target.value)
                    }
                    placeholder="customer@example.com"
                    className="me-2"
                  />
                  <Button
                    variant="danger"
                    onClick={() => removeCustomerEmail(index)}
                  >
                    &times;
                  </Button>
                </div>
              ))}

              <Button
                variant="outline-primary"
                size="sm"
                onClick={addCustomerEmail}
                className="mt-2"
              >
                Add Email
              </Button>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-2">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={formData.companyName || ""}
                onChange={handleChange}
                isInvalid={!!errors.companyName}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Type *</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                isInvalid={!!errors.type}
              >
                {transportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label>Insurance</Form.Label>
              <div className="mt-2">
                <Form.Check
                  type="switch"
                  name="insurance"
                  label={formData.insurance ? "Insured" : "Not Insured"}
                  checked={formData.insurance}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Card className="p-3 mb-3">
              <h5>Driver Information</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="carrier.name"
                      value={formData.carrier?.name || ""}
                      onChange={handleChange}
                      isInvalid={!!errors["carrier.name"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["carrier.name"]}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Phone *</Form.Label>
                    <Form.Control
                      type="text"
                      name="carrier.contact"
                      value={formData.carrier?.contact || ""}
                      onChange={handleChange}
                      isInvalid={!!errors["carrier.contact"]}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="carrier.email"
                  value={formData.carrier?.email || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Driver Photos</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleCarrierImageUpload}
                />
                {errors.carrierImages && (
                  <Form.Text className="text-danger">
                    {errors.carrierImages}
                  </Form.Text>
                )}
              </Form.Group>

              <div className="d-flex flex-wrap mt-3">
                {/* Существующие изображения водителя */}
                {existingCarrierImages.map((url, index) => (
                  <div
                    key={`existing-${index}`}
                    className="position-relative me-2 mb-2"
                  >
                    <img
                      src={`${API_URL}/${url}`}
                      alt={`Driver ${index}`}
                      className="img-thumbnail"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0"
                      onClick={() => removeCarrierImage(index, "existing")}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      &times;
                    </Button>
                  </div>
                ))}

                {/* Новые изображения водителя */}
                {newCarrierImageUrls.map((url, index) => (
                  <div
                    key={`new-${index}`}
                    className="position-relative me-2 mb-2"
                  >
                    <img
                      src={url}
                      alt={`New driver ${index}`}
                      className="img-thumbnail"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0"
                      onClick={() => removeCarrierImage(index, "new")}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      &times;
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Location Sections */}
        <Row className="mb-3">
          <Card className="p-3 mb-3">
            <h5>Pickup Location</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Location Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="pickUpLocation.name"
                    value={formData.pickUpLocation?.name || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="pickUpLocation.address"
                    value={formData.pickUpLocation?.address || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>City *</Form.Label>
                  <Form.Control
                    type="text"
                    name="pickUpLocation.city"
                    value={formData.pickUpLocation?.city || ""}
                    onChange={handleChange}
                    isInvalid={!!errors["pickUpLocation.city"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["pickUpLocation.city"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>State *</Form.Label>
                  <Form.Control
                    type="text"
                    name="pickUpLocation.state"
                    value={formData.pickUpLocation?.state || ""}
                    onChange={handleChange}
                    isInvalid={!!errors["pickUpLocation.state"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["pickUpLocation.state"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="pickUpLocation.zip"
                    value={formData.pickUpLocation?.zip || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contact Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="pickUpLocation.contactPhone"
                    value={formData.pickUpLocation?.contactPhone || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card>

          <Card className="p-3 mb-3">
            <h5>Delivery Location</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Location Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="deliveryLocation.name"
                    value={formData.deliveryLocation?.name || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="deliveryLocation.address"
                    value={formData.deliveryLocation?.address || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>City *</Form.Label>
                  <Form.Control
                    type="text"
                    name="deliveryLocation.city"
                    value={formData.deliveryLocation?.city || ""}
                    onChange={handleChange}
                    isInvalid={!!errors["deliveryLocation.city"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["deliveryLocation.city"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>State *</Form.Label>
                  <Form.Control
                    type="text"
                    name="deliveryLocation.state"
                    value={formData.deliveryLocation?.state || ""}
                    onChange={handleChange}
                    isInvalid={!!errors["deliveryLocation.state"]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors["deliveryLocation.state"]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="deliveryLocation.zip"
                    value={formData.deliveryLocation?.zip || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contact Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="deliveryLocation.contactPhone"
                    value={formData.deliveryLocation?.contactPhone || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card>
        </Row>

        {/* Vehicle and Delivery Details */}
        <Row className="mb-3">
          <Col md={8}>
            <Card className="p-3 mb-3">
              <h5>Vehicle Details</h5>
              <Row>
                {["make", "model", "year"].map((field) => (
                  <Col md={4} key={field} className="mb-2">
                    <Form.Group>
                      <Form.Label>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Form.Label>
                      <Form.Control
                        type={field === "year" ? "number" : "text"}
                        name={`vehicleDetails.${field}`}
                        value={formData.vehicleDetails?.[field] || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3 h-100">
              <h5>Schedule</h5>
              <Form.Group className="mb-3">
                <Form.Label>Pickup Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="pickUpDate"
                  value={formData.pickUpDate}
                  onChange={handleChange}
                  isInvalid={!!errors.pickUpDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.pickUpDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Delivery Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  isInvalid={!!errors.deliveryDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.deliveryDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Value ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Special Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                />
              </Form.Group>
            </Card>
          </Col>
        </Row>

        {/* Image Upload */}
        <Row className="mb-3">
          <Col>
            <Card className="p-3">
              <h5>Vehicle Images</h5>
              <Form.Group>
                <Form.Label>Upload Images</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleVehicleImageUpload}
                  accept="image/*"
                />
                {errors.images && (
                  <Form.Text className="text-danger">{errors.images}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Aging (days)</Form.Label>
                <Form.Control
                  type="number"
                  name="aging"
                  value={formData.aging}
                  onChange={handleChange}
                  min="0"
                />
              </Form.Group>
              <Form.Label>Assigned Date</Form.Label>
              <Form.Control
                type="date"
                name="assignedDate"
                value={formData.assignedDate}
                onChange={handleChange}
              />
              <Form.Label>Tracking</Form.Label>
              <Form.Control
                type="text"
                name="tracing"
                value={formData.tracing}
                onChange={handleChange}
              />

              <div className="d-flex flex-wrap mt-3">
                {/* Существующие изображения автомобиля */}
                {existingVehicleImages.map((img, index) => (
                  <div
                    key={`existing-${index}`}
                    className="position-relative me-2 mb-2"
                  >
                    <img
                      src={`${API_URL}/${img}`}
                      alt={`Vehicle ${index}`}
                      className="img-thumbnail"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0"
                      onClick={() => removeVehicleImage(index, "existing")}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      &times;
                    </Button>
                  </div>
                ))}

                {/* Новые изображения автомобиля */}
                {newVehicleImageUrls.map((img, index) => (
                  <div
                    key={`new-${index}`}
                    className="position-relative me-2 mb-2"
                  >
                    <img
                      src={img}
                      alt={`New vehicle ${index}`}
                      className="img-thumbnail"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0"
                      onClick={() => removeVehicleImage(index, "new")}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      &times;
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? "Update Load" : "Create Load"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default LoadForm;
