const db = require("../db/models");
let tasks = {};

tasks.getTasks = async (req, res) => {
  try {
    if (req.query.boardId) {
      var search = { where: { boardId: req.query.boardId } };
    } else {
      var search = {
        include: {
          attributes: [],
          model: db.boards,
          where: { userId: req.user.id },
        },
      };
    }
    let tasks = await db.tasks.findAll({
      include: {
        attributes: [],
        model: db.lists,
        ...search,
      },
      attributes: ["name", "id", "order", "description", "listId"],
      raw: true,
    });
    console.log("getTasks:", tasks);
    res.status(200).json(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};

tasks.createTasks = async (req, res) => {
  try {
    let newTasks = await db.tasks.bulkCreate(req.body.tasks);
    console.log("tasks.createTasks:", newTasks);
    res.status(201).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};

tasks.updateTask = async (req, res) => {
  try {
    let updateTask = await db.tasks.update(
      {
        order: req.body.order,
        listId: req.body.listId,
        description: req.body.description,
      },
      { where: { id: req.body.id }, raw: true }
    );
    console.log("tasks.updateTask:", updateTask);
    res.status(200).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};
tasks.deleteTask = async (req, res) => {
  try {
    await db.tasks.destroy({ where: { id: req.body.id }, raw: true });
    res.status(200).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};

module.exports = tasks;
