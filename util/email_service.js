const nodemailer = require("nodemailer");
exports.sendMail = (toEmail, text, subject) => {
  console.log(toEmail, text);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.emailPass,
    },
  });

  var mailOptions = {
    from: process.env.email,
    to: toEmail,
    subject: subject,
    html: text,
  };

  transporter.sendMail(mailOptions);
};
