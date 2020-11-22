const db = require("../../db/models");
const nodemailer = require("nodemailer");
let mail = {};

let transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

mail.sendLinkConfirmEmail = async ({ confirmEmailToken, email }) => {
  try {
    console.log("CONFIRM EMAIL id:", confirmEmailToken);
    await transporter.sendMail({
      from: `"Sersice toDoList" <${process.env.EMAIL}>`,
      to: `${email}`,
      subject: "Confirm registration",
      text: `Hello!

      You have successfully created an account.
      
      Thank you for registering!
      
      For security reasons, please confirm your email address before proceeding.

      ${process.env.HOST}auth/confirmEmail/${confirmEmailToken}`,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

mail.generateRecoveryLink = async (email, recoveryPasswordToken) => {
  try {
    await transporter.sendMail({
      from: `"Service toDoList" <${process.env.EMAIL}>`,
      to: `${email}`,
      subject: "Recovery password",
      text: `
      A password recovery email has been sent for an account registered 
      to a current email address.
      To confirm the password change, follow the link:
      ${process.env.HOST}auth/recoveryPassword/link/${recoveryPasswordToken}`,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports.mail = mail;
