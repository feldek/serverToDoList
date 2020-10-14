const express = require("express");
const { users } = require("./users");
const { boards } = require("./boards");
const { lists } = require("./lists");
const { tasks } = require("./tasks");
const router = express.Router();
const authToken = require("../authenticate");
const { authenticateToken } = require("./auth/token");


router.post("/users/signUp", async (req, res) => users.signUp(req, res));
router.post("/users/signIn", async (req, res) => users.signIn(req, res));
router.post("/users/recoveryPassword", async (req, res) => users.recoveryPassword(req, res));
router.post("/users/changePassword", authToken, async (req, res) => users.changePassword(req, res));
router.get("/users/confirmEmail/:uuid", async (req, res) => users.confirmEmail(req, res));

router.post("/auth/refreshToken",  async (req, res) => authenticateToken(req, res));
// router.post("/auth/refreshToken", authToken);

router.get("/boards/getBoards", authToken, async (req, res) => boards.getBoards(req, res));
router.post("/boards/createBoard", authToken, async (req, res) => boards.createBoard(req, res));
router.delete("/boards/deleteBoard", authToken, async (req, res) => boards.deleteBoard(req, res));

router.get("/lists/getAllLists", authToken, async (req, res) => lists.getAllLists(req, res));
router.get("/lists/getCurrentLists", authToken, async (req, res) => lists.getCurrentLists(req, res));
router.post("/lists/createList", authToken, async (req, res) => lists.createList(req, res));
router.delete("/lists/deleteList", authToken, async (req, res) => lists.deleteList(req, res));

router.get("/tasks/getAllTasks", authToken, async (req, res) => tasks.getAllTasks(req, res));
router.get("/tasks/getCurrentTasks", authToken, async (req, res) => tasks.getCurrentTasks(req, res));
router.post("/tasks/createTask", authToken, async (req, res) => tasks.createTask(req, res));
router.put("/tasks/updateTask", authToken, async (req, res) => tasks.updateTask(req, res));
router.delete("/tasks/deleteTask", authToken, async (req, res) => tasks.deleteTask(req, res));

module.exports = router;
