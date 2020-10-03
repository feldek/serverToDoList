const { users } = require("../sequelize/users");
const nodemailer = require("nodemailer");
const index = require("../../index");
let mail = {};

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "felldektest@gmail.com",
    pass: "test#456123",
  },
});

mail.confirm = async (email) => {
  try {
    let uuid = await users
      .findOne({ where: { email } })
      .then((res) => res.dataValues.uuid);
    await transporter.sendMail({
      from: '"toDoList" <felldektest@gmail.com>',
      to: `${email}`,
      subject: "Confirm registration",
      text: `Hello!

      You have successfully created an account.
      
      Thank you for registering!
      
      For security reasons, please confirm your email address before proceeding.

      ${index.host}users/confirmEmail/${uuid}`,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

mail.recoveryPassword = async (item) => {
  try {
    await transporter.sendMail({
      from: '"toDoList" <felldektest@gmail.com>',
      to: `${item.email}`,
      subject: "Recovery password",
      text: `
      A password recovery email has been sent for an account registered 
      to a current email address.
      You password:  ${item.password}`,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports.mail = mail;
