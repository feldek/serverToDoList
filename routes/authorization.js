const { mail } = require("./mail/mail");
const index = require("../index");
const { users } = require("./sequelize/account");

let authorization = {};

authorization.signUp = async (req, res) => {
  try {
    await users.create(req.body);
    await res.status(200).json({
      error: false,
      authorization: true,
      message: "You are successfully logged in",
    });
    await mail.confirm(req.body.email, res);
  } catch (e) {
    console.log("func signUp", e);
    if (e.original.code === "23505") {
      res.status(500).json({
        error: true,
        authorization: false,
        description: "This E-mail already registered",
      });
      console.log("This E-mail already registered");
    } else {
      res.status(500).json({
        error: true,
        authorization: false,
        description: e.errors[0].message,
      });
    }
  }
};

authorization.confirmEmail = async (req, res) => {
  try {
    await users.update({ confirm: true }, { where: { uuid: req.params.uuid } });
    res.redirect(index.hostToDoList);
  } catch (e) {
    console.log("func confirmEmail", e);
    res.sendStatus(500);
  }
};

authorization.recoveryPassword = async (req, res) => {
  try {
    let results = await users.findOne({ where: { email: req.body.email } });
    if (!results) {
      res.json({ error: true, message: "This email not found" });
      console.log("This email not found");
    } else {
      if (results.dataValues.confirm === false) {
        res.json({
          error: true,
          message: "Please confirm your email address before proceeding",
        });
        console.log("Please confirm your email address before proceeding");
      } else {
        let mailForgotPassword = await mail.recoveryPassword(results.dataValues);
        res.status(200).json({
          message: "A message with a password has been sent to you email",
          error: false,
        });
        console.log(
          `A message with a password has been sent to you email, result: ${mailForgotPassword}`
        );
      }
    }
  } catch (e) {
    res.sendStatus(500);
    console.log("func recoveryPassword:", e);
  }
};

authorization.signIn = async (req, res) => {
  try {
    let authentication = await users.findOne({
      where: { email: req.body.email, password: req.body.password },
    });
    // let authentication = await account.authentication({
    //   email: req.body.email,
    //   password: req.body.password,
    // });

    if (!authentication) {
      res.status(401).json({
        message: "Incorrect username or password",
        error: true,
      });
    } else {
      res
        .status(200)
        .json({ error: false, authorization: true, message: "you successful login" });
    }
  } catch (e) {
    console.log("func signIn", e);
    res.sendStatus(500);
  }
};

authorization.changePassword = async (req, res) => {
  try {
    let authentication = await users.findOne({
      where: { email: req.body.email, password: req.body.oldPassword },
    });
    if (authentication) {
      let changePassword = await users.update(
        { password: req.body.newPassword },
        {
          where: {
            email: req.body.email,
          },
        }
      );
      if (changePassword) {
        res.status(200).json({
          error: false,
          message: "Password changed successfully",
        });
      } else {
        res.status(500).json({
          error: true,
          message: "Error, Try again",
        });
      }
    } else {
      res.status(401).json({
        error: true,
        message: "Wrong password",
      });
    }
  } catch (e) {
    res.sendStatus(500);
    console.log("func changePassword", e);
  }
};

authorization.test = async (req, res) => {
  res.json({
    test: "Message for test app",
  });
};

module.exports.authorization = authorization;
