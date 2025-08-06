import { Router } from "express";
import { Resend } from "resend";
import { RESEND_API_KEY } from "../config/dotenv";
import { Request, Response } from "express";

const userFormsRouter = Router();
const resend = new Resend(RESEND_API_KEY);

const NEWSLETTER_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter Subscription</title>
  <style>
    body {
      background: #f4f4f4;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 500px;
      margin: 40px auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      padding: 32px 28px;
    }
    .header {
      border-bottom: 2px solid #28a745;
      margin-bottom: 24px;
      padding-bottom: 12px;
      text-align: center;
    }
    .header h1 {
      color: #28a745;
      margin: 0;
      font-size: 26px;
    }
    .content {
      color: #333;
      font-size: 17px;
      text-align: center;
    }
    .footer {
      margin-top: 32px;
      color: #888;
      font-size: 14px;
      text-align: center;
    }
    .email {
      font-weight: bold;
      color: #007bff;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Newsletter Subscription</h1>
    </div>
    <div class="content">
      <p><span class="email">[EMAIL]</span> has subscribed to your newsletter.</p>
      <p>You are requested to add this email to your newsletter list on your respective provider.</p>
    </div>
    <div class="footer">
      <p>This message was sent via your Reachoout website newsletter form.</p>
    </div>
  </div>
</body>
</html>
`;

const CONTACT_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      background: #f4f4f4;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      padding: 36px 32px;
    }
    .header {
      border-bottom: 2px solid #28a745;
      margin-bottom: 28px;
      padding-bottom: 14px;
      text-align: center;
    }
    .header h1 {
      color: #28a745;
      margin: 0;
      font-size: 28px;
    }
    .content {
      color: #333;
      font-size: 17px;
      margin-bottom: 24px;
    }
    .card {
      background: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(40,167,69,0.07);
      padding: 24px 20px;
      margin-bottom: 18px;
    }
    .field {
      margin-bottom: 14px;
    }
    .field-label {
      font-weight: bold;
      color: #28a745;
      margin-bottom: 2px;
      display: block;
      font-size: 15px;
    }
    .field-value {
      color: #333;
      font-size: 16px;
      padding-left: 2px;
      word-break: break-word;
    }
    .reply-button {
      background-color: #28a745;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      margin: 20px 0 0 0;
      font-weight: bold;
      font-size: 16px;
      transition: background 0.2s;
    }
    .reply-button:hover {
      background-color: #218838;
    }
    .footer {
      margin-top: 32px;
      color: #888;
      font-size: 14px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Someone has contacted you</h1>
    </div>
    <div class="content">
      <p>You have received a new message through your contact form.</p>
      <div class="card">
        <div class="field">
          <span class="field-label">Name:</span>
          <span class="field-value">[NAME]</span>
        </div>
        <div class="field">
          <span class="field-label">Email:</span>
          <span class="field-value">[EMAIL]</span>
        </div>
        <div class="field">
          <span class="field-label">Phone:</span>
          <span class="field-value">[PHONE]</span>
        </div>
        <div class="field">
          <span class="field-label">Message:</span>
          <span class="field-value">[MESSAGE]</span>
        </div>
      </div>
      <a href="mailto:[EMAIL]?subject=Re: [SUBJECT]" class="reply-button">
        📧 Reply to Contact
      </a>
    </div>
    <div class="footer">
      <p>This message was sent via your Reachoout website contact form. Please do not reply to this notification email directly.</p>
    </div>
  </div>
</body>
</html>
`;

//v1/submit-form/newsletter
userFormsRouter.post("/newsletter", async (req, res) => {
  const { email, receiverEmail } = req.body;

  const html = NEWSLETTER_TEMPLATE.replace("[EMAIL]", email);

  const { data, error } = await resend.emails.send({
    from: "Reachoout <noreply@notif.reachoout.com>",
    to: receiverEmail,
    subject: "Newsletter Subscription",
    html,
  });
  if (error) {
    res.status(400).json({ resendError: error });
  }
  res.status(200).json({ data });
});

//v1/submit-form/contact
userFormsRouter.post("/contact", async (req, res) => {
  const { receiverEmail, content } = req.body;

  const html = CONTACT_TEMPLATE.replace("[NAME]", content.name || "")
    .replace("[EMAIL]", content.email || "")
    .replace("[PHONE]", content.phone || "")
    .replace("[MESSAGE]", content.message || "");

  const { data, error } = await resend.emails.send({
    from: "Reachoout <noreply@notif.reachoout.com>",
    to: receiverEmail,
    subject: "New Message from Reachoout Contact Form",
    html,
  });
  if (error) {
    res.status(400).json({ resendError: error });
  }
  res.status(200).json({ data });
});

export default userFormsRouter;
