const nodemailer = require("nodemailer");

const sendEmail = async (newUser) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "okfood11irc@gmail.com",
    to: newUser.email,
    subject: "Registro de usuario exitoso",
    html: `<h1>Hola, bienvenido ${newUser.nombre} a nuestra plataforma, gracias por registrarte</h1>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  });
};

module.exports = sendEmail;
