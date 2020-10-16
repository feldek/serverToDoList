const db = require("../db/models");
let tasks = {};

tasks.getAllTasks = async (req, res) => {
  try {
    let allTasks = await db.tasks.findAll({
      include: {
        attributes: [],
        model: db.lists,
        include: {
          attributes: [],
          model: db.boards,
          include: {
            attributes: [],
            model: db.users,
            where: { id: req.user.id },
          },
        },
      },
      attributes: ["name", "id", "order", "description", "listId"],
      raw: true,
    });
    console.log("boards.getBoards:", allTasks);
    res.status(200).json(allTasks);
  } catch (e) {
    console.log("getAll", e);
    res.sendStatus(500);
  }
};

tasks.getCurrentTasks = async (req, res) => {
  try {
    let currentTasks = await db.tasks.findAll({
      include: {
        model: db.lists,
        where: { boardId: req.query.boardId },
        attributes: [],
      },
      attributes: ["name", "id", "order", "listId", "description"],
      raw: true,
    });

    // console.log("tasks.getCurrentTasks:", currentTasks);
    res.status(200).json(currentTasks);
  } catch (e) {
    console.log("tasks.getCurrentTasks", e);
    res.sendStatus(500);
  }
};

tasks.createTask = async (req, res) => {
  try {
    let newTask = await db.tasks.create({
      name: req.body.name,
      listId: req.body.listId,
      order: req.body.order,
    });
    res.status(201).json({ createdTask: true, id: newTask.dataValues.id });
  } catch (e) {
    console.log("tasks.createTask:", e);
    res.sendStatus(500);
  }
};

tasks.updateTask = async (req, res) => {
  try {
    let updateTask = await db.tasks.update(
      { order: req.body.order, listId: req.body.listId },
      { where: { id: req.body.id }, raw: true }
    );
    console.log("tasks.updateTask:", updateTask);
    res.status(200).json({ updatedTask: true });
  } catch (e) {
    console.log("tasks.updateTask:", e);
    res.status(500).json({
      error: true,
      message: "Id this task not found",
    });
  }
};
tasks.deleteTask = async (req, res) => {
  try {
    await db.tasks.destroy({ where: { id: req.body.id }, raw: true });
    res.status(200).json({ deletedTask: true });
  } catch (e) {
    console.log("tasks.deleteTask:", e);
    res.status(500).json({
      error: true,
      message: "Id this task not found",
    });
  }
};

module.exports = tasks;
