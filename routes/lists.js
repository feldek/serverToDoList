const db = require("../db/models");

let lists = {};

lists.getLists = async (req, res) => {
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
    let lists = await db.lists.findAll({
      ...search,
      raw: true,
      attributes: ["name", "id", "boardId"],
    });
    console.log("lists.getLists:", lists);
    res.status(200).json(lists);
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};

lists.createLists = async (req, res) => {
  try {
    let newLists = await db.lists.bulkCreate(req.body.lists);
    console.log("lists.createList:", newLists);
    res.status(201).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};

lists.deleteList = async (req, res) => {
  try {
    await db.lists.destroy({ where: { id: req.body.id }, raw: true });
    res.status(200).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};

module.exports = lists;
