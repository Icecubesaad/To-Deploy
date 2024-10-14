const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Create transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

// Function to send email
async function nodeMailer(req, res) {
  try {
    const {
      message,
      order_value,
      quantity,
      name,
      number,
      email,
      emailOfSeller,
    } = req.body;
    // Load the HTML template
    const fileName =
      order_value && quantity
        ? "emailTemplate.html"
        : "enquiryEmailTemplate.html";
    const templatePath = path.join(__dirname, "..", "public", fileName);
    let htmlTemplate = fs.readFileSync(templatePath, "utf8");
    if (email) {
      htmlTemplate = htmlTemplate
        .replace("{{name}}", name)
        .replace("{{email}}", email)
        .replace("{{message}}", message)
        .replace(`{{number}}`, number);
    } else {
      htmlTemplate = htmlTemplate
        .replace("{{name}}", name)
        .replace("{{order_value}}", order_value)
        .replace("{{quantity}}", quantity)
        .replace("{{message}}", message)
        .replace(`{{number}}`, number);
    }
    // Replace placeholder values in HTML template

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"saad" <saad.qad418@gmail.com>', // sender address
      to: emailOfSeller ? emailOfSeller : "saad.qad418@gmail.com", // recipient address
      subject: `Message from ${name}`, // Subject line
      html: htmlTemplate, // Use the HTML template as email body
    });

    res
      .status(200)
      .json({ msg: "Message sent", id: info.messageId, success: true });
    console.log("email has been sent");
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error sending email", error, success: false });
  }
}

module.exports = {
  nodeMailer,
};
