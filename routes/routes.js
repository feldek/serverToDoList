const express = require("express");
const auth = require("./auth");
const boards = require("./boards");
const lists = require("./lists");
const tasks = require("./tasks");
const router = express.Router();
const authMiddleware = require("./auth/authMiddleware");
const { refreshToken } = require("./auth/token");

router.post("/auth/signUp", async (req, res) => auth.signUp(req, res));
router.post("/auth/signIn", async (req, res) => auth.signIn(req, res));
router.post("/auth/recoveryPassword", async (req, res) => auth.recoveryPassword(req, res));
router.post("/auth/changePassword", authMiddleware, async (req, res) => auth.changePassword(req, res));
router.post("/auth/refreshToken", async (req, res) => refreshToken(req, res));
router.get("/auth/confirmEmail/:id", async (req, res) => auth.confirmEmail(req, res));

router.get("/boards/getBoards", authMiddleware, async (req, res) =>  boards.getBoards(req, res));
router.post("/boards/createBoard", authMiddleware, async (req, res) => boards.createBoard(req, res));
router.delete("/boards/deleteBoard", authMiddleware, async (req, res) => boards.deleteBoard(req, res));

router.get("/lists/getAllLists", authMiddleware, async (req, res) => lists.getAllLists(req, res));
router.get("/lists/getCurrentLists", authMiddleware, async (req, res) => lists.getCurrentLists(req, res));
router.post("/lists/createList", authMiddleware, async (req, res) => lists.createList(req, res));
router.delete("/lists/deleteList", authMiddleware, async (req, res) => lists.deleteList(req, res));

router.get("/tasks/getAllTasks", authMiddleware, async (req, res) => tasks.getAllTasks(req, res));
router.get("/tasks/getCurrentTasks", authMiddleware, async (req, res) => tasks.getCurrentTasks(req, res));
router.post("/tasks/createTask", authMiddleware, async (req, res) => tasks.createTask(req, res));
router.put("/tasks/updateTask", authMiddleware, async (req, res) => tasks.updateTask(req, res));
router.delete("/tasks/deleteTask", authMiddleware, async (req, res) => tasks.deleteTask(req, res));

module.exports = router;
