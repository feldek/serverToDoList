const { mail } = require("../report/mail");
const db = require("../db/models");
const bcrypt = require("bcryptjs");
const {
  getTokensAuth,
  getTokenRecoveryPassword,
  recoveryPasswordTokenSecret,
  generateToken,
  tokenSecretAuth,
  expiresInAuth,
  jwtVerify,
} = require("./auth/token");
const { notification } = require("../report/notification");
let auth = {};

const bcryptVerify = (target) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(target, 8, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
};

auth.signUp = async (req, res) => {
  try {
    const encryptedPassword = await bcryptVerify(req.body.password);
    const user = await db.users.create({
      email: req.body.email,
      password: encryptedPassword,
    });

    console.log("user:", user);
    await auth.signIn(req, res);
    const confirmEmailToken = generateToken(
      { id: user.id },
      tokenSecretAuth,
      expiresInAuth
    );
    await mail.sendLinkConfirmEmail({ confirmEmailToken, email: user.email });
  } catch (e) {
    console.log("func signUp", e);
    if (e.original.code === "23505") {
      res.status(400).json({
        message: "This E-mail already registered",
      });
      console.log("This E-mail already registered");
    } else {
      res.status(500).json({});
    }
  }
};

auth.confirmEmail = async (req, res) => {
  try {
    const user = await jwtVerify(req.params.confirmToken, tokenSecretAuth);
    console.log(__filename, "user:", user);
    const result = await db.users.update({ confirm: true }, { where: { id: user.id } });
    let status, message;
    if (!result[0]) {
      status = false;
      message = "Something went wrong";
    } else {
      status = true;
      message = "The operation was successful, your mail has been confirmed.";
    }
    notification(res, { status, message });
  } catch (err) {
    console.log("func confirmEmail", err);
    if (err.name === "TokenExpiredError") {
      notification(res, { status: false, message: "Link expired" });
    } else {
      notification(res, { status: false, message: "Something went wrong" });
    }
  }
};

auth.recoveryPassword = async (req, res) => {
  let status = (message = description = "");
  try {
    const user = await jwtVerify(req.params.token, recoveryPasswordTokenSecret);
    const encryptedPassword = await bcryptVerify(user.password);
    const result = await db.users.update(
      { password: encryptedPassword },
      { where: { id: user.id } }
    );
    if (result) {
      status = true;
      message = "Password changed successfully";
    } else {
      status = false;
      message = "Something went wrong";
      description = "Please go through the password recovery procedure a little later.";
    }
    notification(res, { status, message, description });
  } catch (err) {
    console.log(__filename, "err:", err);
    if (err.name === "TokenExpiredError") {
      status = false;
      message = "Link expired";
      description = "Please go through the password recovery procedure again";
    } else {
      status = false;
      message = "Link invalid";
    }
    notification(res, { status, message, description });
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
    res.status(500).json({});
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
    res.status(500).json({});
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
      const encryptedPassword = await bcryptVerify(req.body.newPassword);
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
    res.status(500).json({});
    console.log("func changePassword", e);
  }
};

module.exports = auth;
