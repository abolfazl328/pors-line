const nodemailer = require("nodemailer");
exports.sendMail = (toEmail, text) => {
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
    subject: "form saz email validataion",
    text: String(text),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
