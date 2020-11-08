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
          where: { userId: req.user.id },
        },
      },
      attributes: ["name", "id", "order", "description", "listId"],
      raw: true,
    });
    console.log("boards.getBoards:", allTasks);
    res.status(200).json(allTasks);
  } catch (e) {
    console.log(e);
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
    console.log("tasks.getCurrentTasks:", currentTasks);
    res.status(200).json(currentTasks);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

tasks.createTask = async (req, res) => {
  try {
    let newTask =  await db.tasks.create({
      name: req.body.name,
      listId: req.body.listId,
      order: req.body.order,
      id: req.body.id,
    });
    console.log("tasks.createTasks:", newTask);
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

tasks.createTasks = async (req, res) => {
  try {
    let newTasks = await db.tasks.bulkCreate(req.body.tasks);
    console.log("tasks.createTasks:", newTasks);
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
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
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
tasks.deleteTask = async (req, res) => {
  try {
    await db.tasks.destroy({ where: { id: req.body.id }, raw: true });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

tasks.updateDescription = async (req, res) => {
  try {
    let updateTask = await db.tasks.update(
      { description: req.body.description },
      { where: { id: req.body.id }, raw: true }
    );
    console.log("tasks.updateTask:", updateTask);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports = tasks;
