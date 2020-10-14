const db = require("../db/models");
const { boards } = require("./boards");

let tasks = {};

tasks.getAllTasks = async (req, res) => {
  try {
    await db.users
      .findAll({
        where: { id: req.user.id },
        include: {
          model: db.boards,
          attributes: [],
          include: {
            model: db.lists,
            attributes: [],
            include: {
              model: db.tasks,
              attributes: [],
            },
          },
        },
        attributes: [
          "boards.lists.tasks.name",
          "boards.lists.tasks.id",
          "boards.lists.tasks.order",
          "boards.lists.tasks.listId",
        ],
        raw: true,
      })
      .then((result) => {
        console.log("boards.getBoards:", result);
        res.status(200).json(result);
      });
  } catch (e) {
    console.log("getAll", e);
    res.sendStatus(500);
  }
};

let test = {
  req: {
    query: {
      boardId: "04d107de-5d62-4efa-bd59-9219dcaf6477",
      userId: "56e3c7f1-5930-4384-92f9-4f64c2409aec",
      listId: "54d102de-5d63-2efa-bd59-0219dcaf6477",
    },
  },
};

tasks.getCurrentTasks = async (req, res) => {
  try {
    await db.boards
      .findAll({
        where: { id: req.query.boardId },
        include: {
          model: db.lists,
          attributes: [],
          include: {
            model: db.tasks,
            attributes: [],
          },
        },
        attributes: [
          "lists.tasks.name",
          "lists.tasks.id",
          "lists.tasks.order",
          "lists.tasks.listId",
        ],
        raw: true,
      })
      .then((result) => {
        console.log("tasks.getCurrentTasks:", result);
        res.status(200).json(result);
      });
  } catch (e) {
    console.log("tasks.getCurrentTasks", e);
    res.sendStatus(500);
  }
};

tasks.createTask = async (req, res) => {
  try {
    await db.tasks
      .create({
        name: req.body.name,
        listId: req.body.listId,
        order: req.body.order,
      })
      .then((data) => {
        console.log("tasks.createTask:", data);
        res.status(201).json({ createdTask: true, id: data.dataValues.id });
      });
  } catch (e) {
    console.log("tasks.createTask:", e);
    res.sendStatus(500);
  }
};

tasks.updateTask = async (req, res) => {
  try {
    await db.tasks
      .update(
        { order: req.body.order, listId: req.body.listId },
        { where: { id: req.body.id }, raw: true }
      )
      .then((result) => {
        console.log("tasks.updateTask:", result);
        res.status(200).json({ updatedTask: true });
      });
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
    await db.tasks.destroy({ where: { id: req.body.id }, raw: true }).then((result) => {
      console.log("tasks.deleteTask:", result);
      res.status(200).json({ deletedTask: true });
    });
  } catch (e) {
    console.log("tasks.deleteTask:", e);
    res.status(500).json({
      error: true,
      message: "Id this task not found",
    });
  }
};

module.exports.tasks = tasks;
