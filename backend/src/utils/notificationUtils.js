import nodemailer from "nodemailer";
import twilio from "twilio";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendEmail = async (options) => {
  try {
    const to = options.userEmail || options.to;
    const subject = options.subject || `[${(options.type || "Alert").toUpperCase()}] Health Alert`;
    const text = options.message || options.text || "";

    if (!to) return;

    await transporter.sendMail({
      from: `"Healthsync Alerts" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: options.severity ? `${text}\nSeverity: ${options.severity}` : text,
    });
  } catch (err) {
    console.error("Email error:", err.message);
  }
};

let twilioClient = null;
const getTwilioClient = () => {
  if (!twilioClient && process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  }
  return twilioClient;
};

export const sendSMS = async (options) => {
  try {
    const rawPhone = options.userPhone || options.to;
    if (!rawPhone) return;

    const client = getTwilioClient();
    if (!client || !process.env.TWILIO_PHONE) return;

    let phone = rawPhone.replace(/\D/g, "");
    if (phone.length === 10) phone = `+91${phone}`;
    else if (!rawPhone.startsWith("+")) phone = `+${phone}`;
    else phone = rawPhone;

    const body = options.message || `${(options.type || "Alert").toUpperCase()} Alert: ${options.message || ""}`;

    await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });
  } catch (err) {
    console.error("SMS error:", err.message);
  }
};

export const sendPush = async (options) => {
  try {
    console.log("App Push Notification:", options.message || options);
  } catch (err) {
    console.error("Push notification error:", err.message);
  }
};
