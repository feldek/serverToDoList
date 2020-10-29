const db = require("../db/models");

let lists = {};

lists.getAllLists = async (req, res) => {
  try {
    let allLists = await db.lists.findAll({
      include: {
        model: db.boards,
        where: { userId: req.user.id },
        attributes: [],
      },
      raw: true,
      attributes: ["name", "id", "boardId"],
    });
    console.log("lists.getAllLists:", allLists);
    res.status(200).json(allLists);
  } catch (e) {
    console.log(e);
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
    console.log(e);
    res.sendStatus(500);
  }
};

lists.createList = async (req, res) => {
  try {
    let newList = req.body.id
      ? await db.lists.create({
          boardId: req.body.boardId,
          name: req.body.name,
          id: req.body.id,
        })
      : await db.lists.create({
          boardId: req.body.boardId,
          name: req.body.name,
        });
    console.log("lists.createList:", newList);
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

lists.deleteList = async (req, res) => {
  try {
    await db.lists.destroy({ where: { id: req.body.id }, raw: true });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports = lists;
