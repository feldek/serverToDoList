const db = require("../../db/models");
const nodemailer = require("nodemailer");
let mail = {};

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.FELLDEK_EMAIL,
    pass: process.env.FELLDEK_EMAIL_PASSWORD,
  },
});

mail.confirmEmail = async ({ id, email }) => {
  try {
    console.log("CONFIRM EMAIL id:", id);
    await transporter.sendMail({
      from: '"toDoList" <felldektest@gmail.com>',
      to: `${email}`,
      subject: "Confirm registration",
      text: `Hello!

      You have successfully created an account.
      
      Thank you for registering!
      
      For security reasons, please confirm your email address before proceeding.

      ${process.env.FELLDEK_HOST}auth/confirmEmail/${id}`,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

mail.generateRecoveryLink = async (email, recoveryPasswordToken) => {
  try {
    await transporter.sendMail({
      from: '"toDoList" <felldektest@gmail.com>',
      to: `${email}`,
      subject: "Recovery password",
      text: `
      A password recovery email has been sent for an account registered 
      to a current email address.
      To confirm the password change, follow the link:
      ${process.env.FELLDEK_HOST}auth/recoveryPassword/link/${recoveryPasswordToken}`,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports.mail = mail;
