const { account } = require("./db/account");
const { mail } = require("./mail/mail");
const index = require("../index");

let authorization = {};

authorization.signUp = async (req, res) => {
  try {
    let results = await account.signUp(req.body);
    res.status(200).json({ error: false, authorization: true });
    let mailConfirm = await mail.confirm(req.body.email, res);
  } catch (e) {
    if (e.code === "23505") {
      res.status(409).json({
        error: true,
        authorization: false,
        message: "This E-mail already registered",
      });
    }
    e.authorization = false;
    console.log(e);
    res.status(500).json(e);
  }
};

authorization.confirmEmail = async (req, res) => {
  try {
    let results = await account.confirm(req.params.uuid);
    res.redirect(index.hostToDoList);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

authorization.recoveryPassword = async (req, res) => {
  try {
    let results = await account.userData(req.body.email);
    if (!results) {
      res.json({ error: true, message: "This email not found" });
      console.log("This email not found");
    } else {
      if (results.confirm === false) {
        res.json({
          error: true,
          message: "Please confirm your email address before proceeding",
        });
        console.log("Please confirm your email address before proceeding");
      } else {
        let mailForgotPassword = await mail.recoveryPassword(results);
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
    console.log(e);
  }
};

authorization.signIn = async (req, res) => {
  try {
    let authentication = await account.authentication({
      email: req.body.email,
      password: req.body.password,
    });
    if (!authentication) {
      res.status(200).json({
        message: "Incorrect username or password",
        error: true,
      });
    } else {
      res.status(200).json({ error: false, authorization: true });
    }
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};

authorization.changePassword = async (req, res) => {
  try {
    let authentication = await account.authentication({
      email: req.body.email,
      password: req.body.oldPassword,
    });
    console.log("authentication:", authentication);
    if (authentication) {
      let changePassword = account.changePassword({
        email: req.body.email,
        newPassword: req.body.newPassword,
      });
      if (changePassword) {
        res.status(200).json({
          error: false,
          message: "Password changed successfully",
        });
      } else {
        res.status(200).json({
          error: true,
          message: "Error, Try again",
        });
      }
    } else {
      res.status(200).json({
        error: true,
        message: "Wrong password",
      });
    }
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};

authorization.test = async (req, res) => {
  res.json({
    test: "Message for test app",
  });
};

module.exports.authorization = authorization;
