const { mail } = require("./mail/mail");
const db = require("../db/models");
const { generateTokens } = require("./auth/token");
const hostToDoList = process.env.FELLDEK_HOST_TO_DO_LIST;

let auth = {};

auth.signUp = async (req, res) => {
  try {
    await db.users.create({ email: req.body.email, password: req.body.password });
    await auth.signIn(req, res);
    await mail.confirmEmail(req.body.email, res);
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

auth.confirmEmail = async (req, res) => {
  try {
    await db.users.update({ confirm: true }, { where: { id: req.params.id } });
    res.redirect(hostToDoList);
  } catch (e) {
    console.log("func confirmEmail", e);
    res.sendStatus(500);
  }
};

auth.recoveryPassword = async (req, res) => {
  try {
    let recoveryPassword = await db.users.findOne({ where: { email: req.body.email } });
    if (!recoveryPassword) {
      res.json({ error: true, message: "This email not found" });
      console.log("This email not found");
    } else {
      if (recoveryPassword.dataValues.confirm === false) {
        res.json({
          error: true,
          message: "Please confirm your email address before proceeding",
        });
        console.log("Please confirm your email address before proceeding");
      } else {
        let mailForgotPassword = await mail.recoveryPassword(recoveryPassword.dataValues);
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

auth.signIn = async (req, res) => {
  try {
    let user = await db.users.findOne({
      where: { email: req.body.email, password: req.body.password },
      attributes: ["id"],
      raw: true,
    });

    console.log("users.signIn user:", user);

    if (!user) {
      res.status(401).json({
        message: "Incorrect username or password",
        error: true,
        token: {},
        refreshToken: {},
      });
    } else {
      let tokens = generateTokens({ id: user.id });
      console.log("users.signIn tokens:", tokens);
      res.status(200).json({
        error: false,
        authorization: true,
        message: "You are successfully logged in",
        ...tokens,
      });
    }
  } catch (e) {
    console.log("func signIn", e);
    res.sendStatus(500);
  }
};

auth.changePassword = async (req, res) => {
  try {
    let authentication = await db.users.findOne({
      where: { id: req.user.id, password: req.body.oldPassword },
    });
    if (authentication) {
      let changePassword = await db.users.update(
        { password: req.body.newPassword },
        {
          where: {
            id: req.user.id,
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

module.exports = auth;
