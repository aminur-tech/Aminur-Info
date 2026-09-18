type ContactNotification = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactNotification(contact: ContactNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ADMIN_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !recipient) {
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
      text: [
        "New Contact Message",
        "",
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        `Subject: ${contact.subject}`,
        "",
        "Message:",
        contact.message,
      ].join("\n"),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email provider rejected the notification: ${details}`);
  }

  return { sent: true };
}
