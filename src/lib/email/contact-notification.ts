import nodemailer from "nodemailer";

type ContactNotification = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string | null;
  projectType?: string | null;
  budgetRange?: string | null;
};

function buildNotificationText(contact: ContactNotification) {
  return [
    "New contact message",
    "",
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Subject: ${contact.subject}`,
    contact.company ? `Company: ${contact.company}` : "Company: N/A",
    contact.projectType ? `Project Type: ${contact.projectType}` : "Project Type: N/A",
    contact.budgetRange ? `Budget Range: ${contact.budgetRange}` : "Budget Range: N/A",
    "",
    "Message:",
    contact.message,
  ].join("\n");
}

export async function sendContactNotification(contact: ContactNotification) {
  const recipient = process.env.ADMIN_EMAIL;

  if (!recipient) {
    console.warn("Contact email is not configured; the message was saved without notification.");
    return { sent: false };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL ?? smtpUser,
      to: recipient,
      replyTo: contact.email,
      subject: `New portfolio message: ${contact.subject}`,
      text: buildNotificationText(contact),
    });

    return { sent: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("Contact email is not configured; the message was saved without notification.");
    return { sent: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: contact.email,
      subject: `New portfolio message: ${contact.subject}`,
      text: buildNotificationText(contact),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email provider rejected the notification: ${details}`);
  }

  return { sent: true };
}
