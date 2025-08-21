// mailer.js
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// --- Transporter ---------------------------------------
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,                 // e.g. "ciertacorp.com"
  port: Number(process.env.EMAIL_PORT || 465),  // 465 for SMTPS
  secure: true,                                 // mandatory for 465
  auth: {
    user: process.env.EMAIL_USER,               // e.g. "noreply@ciertacorp.com"
    pass: process.env.EMAIL_PASS,
  },
  logger: true,
  debug: true,
});

// Optional: call this at app start to verify SMTP connectivity
const verifySmtp = () =>
  transporter.verify()
    .then(() => console.log("[MAIL] SMTP verified OK"))
    .catch(err => {
      console.error("[MAIL] SMTP verify failed", {
        code: err.code, command: err.command, response: err.response
      });
      // don't throw here if you want app to continue starting up
    });

// Helper: parse comma-separated recipients from env
const getEnvRecipients = () => {
  const raw = process.env.EMAIL_TO || "";
  return raw.split(",").map(s => s.trim()).filter(Boolean);
};

// Helper: safe date format
const formatDate = (dateLike) => {
  if (!dateLike) return "N/A";
  const date = new Date(dateLike);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
};

// --- Public API ----------------------------------------

// Contact form to support inbox
const sendContactMail = (data = {}) => {
  const to = getEnvRecipients();
  if (to.length === 0) {
    const err = new Error("EMAIL_TO is empty or invalid");
    console.error("[MAIL][sendContactMail] No recipients configured");
    return Promise.reject(err);
  }

  const subject = `New support request: ${data.subject || "(no subject)"}`;

  return transporter.sendMail({
    from: `"Cierta Support" <${process.env.EMAIL_USER}>`,
    replyTo: data.email,
    to,
    subject,
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #FAF8F8; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(to right, #1D75BF, #5FAEF1); color: #FFFFFF; padding: 20px;">
          <h2 style="margin: 0;">New Support Request</h2>
          <p style="margin: 5px 0;">From: ${data.name || "Unknown"}</p>
          <p style="margin: 5px 0;">Subject: ${data.subject || "(no subject)"}</p>
        </div>

        <div style="padding: 20px; color: #212121;">
          <h3 style="margin-top: 0; color: #1D75BF;">Message Details</h3>
          <p style="white-space: pre-wrap;">${data.message || ""}</p>

          <h3 style="color: #1D75BF; margin-top: 25px;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.name || "-"}</p>
          <p><strong>Email:</strong> ${data.email || "-"}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        </div>

        <div style="background-color: #F4F4F4; text-align: center; padding: 15px; color: #ABABAB; font-size: 12px;">
          This email was automatically generated from the Cierta support form.
        </div>
      </div>
    </div>
    `,
  })
  .then(info => {
    console.log("[MAIL][sendContactMail] Sent", {
      id: info.messageId, accepted: info.accepted, rejected: info.rejected, response: info.response
    });
    return info;
  })
  .catch(err => {
    console.error("[MAIL][sendContactMail] Failed", {
      code: err.code, command: err.command, responseCode: err.responseCode, response: err.response, rejected: err.rejected
    });
    throw err;
  });
};

// Quote/Shipping request from main form
const sendMail = (data = {}) => {
  const to = getEnvRecipients();
  if (to.length === 0) {
    const err = new Error("EMAIL_TO is empty or invalid");
    console.error("[MAIL][sendMail] No recipients configured");
    return Promise.reject(err);
  }

  const subject = `New shipping request from ${[data.firstName, data.lastName].filter(Boolean).join(" ") || "Customer"}`;

  return transporter.sendMail({
    from: `"Cierta Corporation" <${process.env.EMAIL_USER}>`,
    replyTo: data.email,
    to,
    subject,
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #FAF8F8; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(to right, #1D75BF, #5FAEF1); color: #FFFFFF; padding: 20px;">
          <h2 style="margin: 0;">New Shipping Request</h2>
          <p style="margin: 5px 0;">Type: ${data.type === "business" ? "Business" : "Individual"}</p>
          <p style="margin: 5px 0;">Service: ${data.service || "-"}</p>
        </div>

        <div style="padding: 20px; color:rgb(0, 0, 0);">
          <h3 style="margin-top: 0; color: #1D75BF;">Route</h3>
          <p><strong>From:</strong> ${data.from || "-"}</p>
          <p><strong>To:</strong> ${data.to || "-"}</p>

          <h3 style="color: #1D75BF;">Dates</h3>
          <p><strong>Pickup Date:</strong> ${formatDate(data.pickupDate)}</p>
          <p><strong>Delivery Date:</strong> ${formatDate(data.deliveryDate)}</p>

          <h3 style="color: #1D75BF;">Contact Information</h3>
          <p><strong>Name:</strong> ${[data.firstName, data.lastName].filter(Boolean).join(" ") || "-"}</p>
          <p><strong>Email:</strong> ${data.email || "-"}</p>
          <p><strong>Phone:</strong> ${data.phone ? `+${data.phone}` : "-"}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}

          ${data.details ? `
            <h3 style="color: #1D75BF;">Shipment Details</h3>
            <p style="white-space: pre-wrap;">${data.details}</p>` : ""}
        </div>

        <div style="background-color: #F4F4F4; text-align: center; padding: 15px; color: #ABABAB; font-size: 12px;">
          This email was automatically generated by the Cierta services website.
        </div>
      </div>
    </div>
    `,
  })
  .then(info => {
    console.log("[MAIL][sendMail] Sent", {
      id: info.messageId, accepted: info.accepted, rejected: info.rejected, response: info.response
    });
    return info;
  })
  .catch(err => {
    console.error("[MAIL][sendMail] Failed", {
      code: err.code, command: err.command, responseCode: err.responseCode, response: err.response, rejected: err.rejected
    });
    throw err;
  });
};

// Status updates to customers
const sendStatusUpdateEmail = (load = {}, oldStatus, newStatus) => {
  // accept both "customerEmail" and legacy "costomerEmail"
  const rawEmails = load.customerEmail ?? load.costomerEmail;

  const customerEmails = Array.isArray(rawEmails)
    ? rawEmails
    : [rawEmails].filter(Boolean);

  if (customerEmails.length === 0) {
    console.log("[MAIL][sendStatusUpdateEmail] No recipient emails found on load");
    return Promise.resolve();
  }

  const statusMap = {
    "in process": "In Process",
    "picked up": "In Transit",
    "delivered": "Delivered",
    "cancelled": "Cancelled",
  };

  const oldStatusText = statusMap[String(oldStatus || "").toLowerCase()] || (oldStatus || "—");
  const newStatusText = statusMap[String(newStatus || "").toLowerCase()] || (newStatus || "—");

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #FAF8F8; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(to right, #1D75BF, #5FAEF1); color: #FFFFFF; padding: 20px;">
          <h2 style="margin: 0;">Shipment Status Updated</h2>
          <p style="margin: 5px 0; font-size: 1.2em;">
            <span style="text-decoration: line-through; opacity: 0.7;">${oldStatusText}</span>
            →
            <strong style="font-size: 1.3em;">${newStatusText}</strong>
          </p>
        </div>

        <div style="padding: 20px; color: #212121;">
          <h3 style="margin-top: 0; color: #1D75BF;">Shipment Details</h3>
          <p><strong>VIN:</strong> ${load.Vin || "-"}</p>
          <p><strong>Transport Type:</strong> ${load.type || "-"}</p>

          <div style="display: flex; gap: 20px; margin-top: 15px;">
            <div style="flex: 1;">
              <h4 style="color: #1D75BF; border-bottom: 1px solid #eee; padding-bottom: 5px;">Pickup Location</h4>
              <p>${load.pickUpLocation?.name || "N/A"}</p>
              <p>${load.pickUpLocation?.address || "N/A"}</p>
              <p>${load.pickUpLocation?.city || "N/A"}, ${load.pickUpLocation?.state || "N/A"} ${load.pickUpLocation?.zip || ""}</p>
              <p>${load.pickUpLocation?.contactPhone || "N/A"}</p>
            </div>
            <div style="flex: 1;">
              <h4 style="color: #1D75BF; border-bottom: 1px solid #eee; padding-bottom: 5px;">Delivery Location</h4>
              <p>${load.deliveryLocation?.name || "N/A"}</p>
              <p>${load.deliveryLocation?.address || "N/A"}</p>
              <p>${load.deliveryLocation?.city || "N/A"}, ${load.deliveryLocation?.state || "N/A"} ${load.deliveryLocation?.zip || ""}</p>
              <p>${load.deliveryLocation?.contactPhone || "N/A"}</p>
            </div>
          </div>

          <div style="display: flex; gap: 20px; margin-top: 15px;">
            <div style="flex: 1;">
              <h4 style="color: #1D75BF; border-bottom: 1px solid #eee; padding-bottom: 5px;">Carrier Information</h4>
              <p><strong>Name:</strong> ${load.carrier?.name || "N/A"}</p>
              <p><strong>Contact:</strong> ${load.carrier?.contact || "N/A"}</p>
              <p><strong>Email:</strong> ${load.carrier?.email || "N/A"}</p>
            </div>
          </div>

          <h3 style="color: #1D75BF; margin-top: 25px;">Vehicle Information</h3>
          <p><strong>Make:</strong> ${load.vehicleDetails?.make || " "}</p>
          <p><strong>Model:</strong> ${load.vehicleDetails?.model || " "}</p>
          <p><strong>Year:</strong> ${load.vehicleDetails?.year || " "}</p>
          <p><strong>Color:</strong> ${load.vehicleDetails?.color || " "}</p>
          <p><strong>Mileage:</strong> ${load.vehicleDetails?.mileage || " "}</p>

          <h3 style="color: #1D75BF; margin-top: 25px;">Timeline</h3>
          <p><strong>Pickup Date:</strong> ${formatDate(load.pickUpDate)}</p>
          <p><strong>Delivery Date:</strong> ${formatDate(load.deliveryDate)}</p>
          <p><strong>Assigned Date:</strong> ${load.assignedDate ? formatDate(load.assignedDate) : "N/A"}</p>
          <p><strong>Last Updated:</strong> ${formatDate(new Date())}</p>

          ${String(newStatus || "").toLowerCase() === "picked up" ? `
            <div style="background-color: #e8f4ff; padding: 10px; border-radius: 5px; margin-top: 15px;">
              <h4 style="color: #1D75BF; margin: 0;">Your shipment is on the way!</h4>
              <p style="margin: 5px 0;">
                Track your shipment:
                <a href="${load.tracing || "#"}" style="color: #1D75BF; text-decoration: none;">
                  Track Shipment
                </a>
              </p>
            </div>` : ""}

          ${String(newStatus || "").toLowerCase() === "delivered" ? `
            <div style="background-color: #e8f6ef; padding: 10px; border-radius: 5px; margin-top: 15px;">
              <h4 style="color: #28a745; margin: 0;">Your shipment has been delivered!</h4>
              <p style="margin: 5px 0;">Thank you for choosing Cierta Corporation.</p>
            </div>` : ""}
        </div>

        <div style="background-color: #F4F4F4; text-align: center; padding: 15px; color: #ABABAB; font-size: 12px;">
          This email was automatically generated by Cierta Corporation tracking system.
        </div>
      </div>
    </div>
  `;

  const fromHeader = `"noreply@ciertacorp.com" <${process.env.EMAIL_USER}>`;

  const sendPromises = customerEmails.map(email =>
    transporter.sendMail({
      from: fromHeader,
      to: String(email).trim(),
      subject: `Status Update for Shipment #${load.Vin || load._id || ""}`.trim(),
      html: htmlContent,
    })
    .then(info => {
      console.log("[MAIL][sendStatusUpdateEmail] Sent to", email, {
        id: info.messageId, accepted: info.accepted, rejected: info.rejected, response: info.response
      });
      return info;
    })
    .catch(err => {
      console.error("[MAIL][sendStatusUpdateEmail] Failed for", email, {
        code: err.code, command: err.command, responseCode: err.responseCode, response: err.response, rejected: err.rejected
      });
      throw err;
    })
  );

  return Promise.all(sendPromises);
};

// Welcome email after user creation
const sendUserCreatedEmail = (userData = {}) => {
  if (!userData.email) {
    const err = new Error("sendUserCreatedEmail: userData.email is required");
    console.error("[MAIL][sendUserCreatedEmail] Missing recipient");
    return Promise.reject(err);
  }

  return transporter.sendMail({
    from: `"Cierta Support" <${process.env.EMAIL_USER}>`,
    to: userData.email,
    subject: "Your Cierta account has been created",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #FAF8F8; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(to right, #1D75BF, #5FAEF1); color: #FFFFFF; padding: 20px;">
          <h2 style="margin: 0;">Account Created Successfully</h2>
          <p style="margin: 5px 0;">Welcome to Cierta Corporation</p>
        </div>

        <div style="padding: 20px; color: #212121;">
          <p>Hello ${userData.firstName || "User"},</p>
          <p>Your account has been successfully created. Below are your login credentials:</p>

          <div style="background-color: #F4F4F4; padding: 15px; border-radius: 5px; margin-top: 15px;">
            <p><strong>Login:</strong> ${userData.login || "-"}</p>
            <p><strong>Password:</strong> ${userData.password || "-"}</p>
          </div>

          <p style="margin-top: 20px;">
            You can now log in to your account at
            <a href="https://adminpanel.ciertacorp.com/login" style="color: #1D75BF; text-decoration: none;">
              https://adminpanel.ciertacorp.com/login
            </a>
          </p>
          <p>We recommend changing your password after first login.</p>
        </div>

        <div style="background-color: #F4F4F4; text-align: center; padding: 15px; color: #ABABAB; font-size: 12px;">
          This email was automatically generated by Cierta account system.
        </div>
      </div>
    </div>
    `,
  })
  .then(info => {
    console.log("[MAIL][sendUserCreatedEmail] Sent", {
      id: info.messageId, accepted: info.accepted, rejected: info.rejected, response: info.response
    });
    return info;
  })
  .catch(err => {
    console.error("[MAIL][sendUserCreatedEmail] Failed", {
      code: err.code, command: err.command, responseCode: err.responseCode, response: err.response, rejected: err.rejected
    });
    throw err;
  });
};

module.exports = {
  verifySmtp,
  sendMail,
  sendContactMail,
  sendStatusUpdateEmail,
  sendUserCreatedEmail,
};
