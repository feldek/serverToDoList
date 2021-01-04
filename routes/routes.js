const express = require("express");
const auth = require("./auth");
const boards = require("./boards");
const lists = require("./lists");
const tasks = require("./tasks");
const { geoPlugin, weatherPlugin } = require("./api/weatherplugin");
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

router.get("/lists", authMiddleware, lists.getLists);
router.post("/lists", authMiddleware, lists.createLists);
router.delete("/list", authMiddleware, lists.deleteList);

router.get("/tasks", authMiddleware, tasks.getTasks);
router.post("/tasks", authMiddleware, tasks.createTasks);
router.patch("/task", authMiddleware, tasks.updateTask);
router.delete("/task", authMiddleware, tasks.deleteTask);

router.get("/api/geoplugin", authMiddleware, geoPlugin);
router.get("/api/weatherplugin", authMiddleware, weatherPlugin);

module.exports = router;
