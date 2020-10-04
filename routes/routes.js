const express = require("express");
const { users } = require("./users");
const { boards } = require("./boards");
const { lists } = require("./lists");
const router = express.Router();

router.post("/signUp", async (req, res) => auth.signUp(req, res));

router.post("/signIn", async (req, res) => auth.signIn(req, res));

router.post("/recoveryPassword", async (req, res) => auth.recoveryPassword(req, res));

router.post("/changePassword", async (req, res) => auth.changePassword(req, res));

router.get("/confirmEmail/:uuid", async (req, res) => auth.confirmEmail(req, res));

router.get("/", async (req, res) => auth.test(req, res));

router.get("/lists/getAllLists", async (req, res) => lists.getAllLists(req, res));
router.get("/lists/getCurrentLists", async (req, res) => lists.getCurrentLists(req, res));
router.post("/lists/createList", async (req, res) => lists.createList(req, res));
router.delete("/lists/deleteList", async (req, res) => lists.deleteList(req, res));

module.exports = router;
