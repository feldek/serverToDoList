const express = require("express");
const { authorization: auth } = require("./authorization");
const router = express.Router();

router.post("/signUp", async (req, res) => auth.signUp(req, res));

router.post("/signIn", async (req, res) => auth.signIn(req, res));

router.post("/recoveryPassword", async (req, res) => auth.recoveryPassword(req, res));

router.post("/changePassword", async (req, res) => auth.changePassword(req, res));

router.get("/confirmEmail/:uuid", async (req, res) => auth.confirmEmail(req, res));

router.get("/", async (req, res) => auth.test(req, res));

module.exports = router;
