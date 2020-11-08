const { mail } = require("./mail/mail");
const jwt = require("jsonwebtoken");
const db = require("../db/models");
const bcrypt = require("bcryptjs");
const {
  getTokensAuth,
  getTokenRecoveryPassword,
  recoveryPasswordTokenSecret,
} = require("./auth/token");
const { notification } = require("./notification");
let auth = {};

const encrypt = (target) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(target, 8, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
};

auth.signUp = async (req, res) => {
  try {
    const encryptedPassword = await encrypt(req.body.password);
    const user = await db.users.create({
      email: req.body.email,
      password: encryptedPassword,
    });

    console.log("user:", user);
    await auth.signIn(req, res);
    await mail.confirmEmail({ id: user.id, email: user.email });
  } catch (e) {
    console.log("func signUp", e);
    if (e.original.code === "23505") {
      res.status(400).json({
        message: "This E-mail already registered",
      });
      console.log("This E-mail already registered");
    } else {
      res.sendStatus(500);
    }
  }
};

auth.confirmEmail = async (req, res) => {
  try {
    const result = await db.users.update(
      { confirm: true },
      { where: { id: req.params.id } }
    );
    if (!result[0]) {
      req.query.status = false;
      req.query.message = "Something went wrong";
    } else {
      req.query.status = true;
      req.query.message = "The operation was successful, your mail has been confirmed.";
    }
    notification(req, res);        
  } catch (e) {
    console.log("func confirmEmail", e);
    res.sendStatus(500);
  }
};

auth.recoveryPassword = async (req, res) => {
  try {
    console.log("in RECOVERY");
    let token = req.params.token;
    jwt.verify(token, recoveryPasswordTokenSecret, async (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          req.query.status = false;
          req.query.message = "Link expired";
          req.query.description =
            "Please go through the password recovery procedure again";
        } else {
          req.query.status = false;
          req.query.message = "Link invalid";
        }
        console.log(__filename, "err:", err);
        notification(req, res);
        return;
      }
      const encryptedPassword = await encrypt(user.password);
      const result = await db.users.update(
        { password: encryptedPassword },
        { where: { id: user.id } }
      );
      if (result) {
        req.query.status = true;
        req.query.message = "Password changed successfully";
      } else {
        req.query.status = false;
        req.query.message = "Something went wrong";
        req.query.description =
          "Please go through the password recovery procedure a little later.";
      }
      notification(req, res);
      return;
    });
  } catch (e) {
    console.log("func confirmEmail", e);
  }
};

auth.generateRecoveryLink = async (req, res) => {
  try {
    let user = await db.users.findOne({
      where: { email: req.body.email },
      attributes: ["id", "confirm", "password"],
    });
    if (!user) {
      res.status(400).json({ message: "This email not found" });
      console.log("This email not found");
    } else {
      if (user.confirm === false) {
        res.status(400).json({
          message: "Please confirm your email address before proceeding",
        });
        console.log("Please confirm your email address before proceeding");
      } else {
        const recoveryPasswordToken = getTokenRecoveryPassword({
          id: user.id,
          password: req.body.password,
        });
        await mail.generateRecoveryLink(req.body.email, recoveryPasswordToken);
        res.status(200).json({
          message: "A message with a password has been sent to you email",
        });
        console.log(`A message with a password has been sent to you email`);
      }
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

auth.signIn = async (req, res) => {
  try {
    let user = await db.users.findOne({
      where: { email: req.body.email },
      attributes: ["id", "email", "password"],
      raw: true,
    });
    let verification = await bcrypt.compare(req.body.password, user.password);
    console.log("verification", verification);

    if (!verification) {
      res.status(401).json({
        message: "Incorrect username or password",
      });
    } else {
      const tokens = getTokensAuth({ id: user.id });
      console.log("users.signIn tokens:", tokens);
      res.status(200).json({
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
    let user = await db.users.findOne({
      where: { id: req.user.id },
      attributes: ["password"],
      raw: true,
    });
    let verification = await bcrypt.compare(req.body.oldPassword, user.password);
    if (verification) {
      const encryptedPassword = await encrypt(req.body.newPassword);
      await db.users.update(
        { password: encryptedPassword },
        { where: { id: req.user.id } }
      );
      res.status(200).json({
        message: "Password changed successfully",
      });
    } else {
      res.status(400).json({
        message: "Wrong password",
      });
    }
  } catch (e) {
    res.sendStatus(500);
    console.log("func changePassword", e);
  }
};

module.exports = auth;
