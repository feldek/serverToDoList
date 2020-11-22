const express = require("express");
const auth = require("./auth");
const boards = require("./boards");
const lists = require("./lists");
const tasks = require("./tasks");
const router = express.Router();
const authMiddleware = require("./auth/authMiddleware");
const { refreshTokensAuth } = require("./auth/token");

router.post("/auth/signUp", auth.signUp);
router.post("/auth/signIn", auth.signIn);
router.post("/auth/recoveryPassword", auth.generateRecoveryLink);
router.get("/auth/recoveryPassword/link/:token", auth.recoveryPassword);
router.post("/auth/changePassword", authMiddleware, auth.changePassword);
router.post("/auth/refreshTokensAuth", refreshTokensAuth);
router.get("/auth/confirmEmail/:confirmToken", auth.confirmEmail);

router.get("/boards", authMiddleware, boards.getBoards);
router.post("/board", authMiddleware, boards.createBoard);
router.delete("/board", authMiddleware, boards.deleteBoard);

router.get("/lists/getAllLists", authMiddleware, lists.getAllLists);
router.get("/lists", authMiddleware, lists.getCurrentLists);
router.post("/list", authMiddleware, lists.createList);
router.post("/lists", authMiddleware, lists.createLists);
router.delete("/list", authMiddleware, lists.deleteList);

router.get("/tasks/getAllTasks", authMiddleware, tasks.getAllTasks);
router.get("/tasks", authMiddleware, tasks.getCurrentTasks);
router.post("/task", authMiddleware, tasks.createTask);
router.post("/tasks", authMiddleware, tasks.createTasks);
router.patch("/task", authMiddleware, tasks.updateTask);
router.delete("/task", authMiddleware, tasks.deleteTask);

router.patch("/task/description", authMiddleware, tasks.updateDescription);
module.exports = router;
