const db = require("../db/models");

let lists = {};

lists.getAllLists = async (req, res) => {
  try {
    let allLists = await db.lists.findAll({
      include: {
        model: db.boards,
        include: {
          model: db.users,
          where: { id: test.req.query.userId },
          attributes: [],
        },
        attributes: [],
      },
      raw: true,
      attributes: ["name", "id", "boardId"],
    });
    console.log("lists.getAllLists:", allLists);
    res.status(200).json(allLists);
  } catch (e) {
    console.log("lists.getAllLists:", e);
    res.sendStatus(500);
  }
};

lists.getCurrentLists = async (req, res) => {
  try {
    let currentList = await db.lists.findAll({
      where: { boardId: req.query.boardId },
      attributes: ["name", "id", "boardId"],
      raw: true,
    });
    console.log("lists.getCurrentLists:", currentList);
    res.status(200).json(currentList);
  } catch (e) {
    console.log("lists.getCurrentLists:", e);
    res.sendStatus(500);
  }
};

lists.createList = async (req, res) => {
  try {
    let newList = await db.lists.create({
      boardId: req.body.boardId,
      name: req.body.name,
    });
    console.log("lists.createList:", newList);
    res.status(201).json({ createdList: true, id: newList.dataValues.id });
  } catch (e) {
    console.log("lists.createList:", e);
    res.sendStatus(500);
  }
};

lists.deleteList = async (req, res) => {
  try {
    await db.lists.destroy({ where: { id: req.body.id }, raw: true });
    res.status(200).json({ deletedList: true });
  } catch (e) {
    console.log("lists.deleteList:", e);
    res.status(500).json({
      error: true,
      message: "Id this list not found",
    });
  }
};

module.exports = lists;
