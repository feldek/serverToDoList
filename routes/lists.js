const { boards: boardsBd } = require("./sequelize/boards");
const { lists: listsBd } = require("./sequelize/lists");
const { users: usersBd } = require("./sequelize/users");

let lists = {};

lists.getAllLists = async (req, res) => {
  try {
    usersBd
      .findAll({
        where: { email: req.query.email },
        include: {
          model: boardsBd,
          attributes: [],
          include: {
            model: listsBd,
            attributes: [],
          },
        },
        attributes: ["boards.lists.name", "boards.lists.id", "boards.lists.boardId"],
        raw: true,
      })
      .then((result) => {
        console.log("boards.getBoards:", result);
        res.status(201).json(result);
      });
  } catch (e) {
    console.log("getAll", e);
    res.sendStatus(500);
  }
};

lists.getCurrentLists = async (req, res) => {
  try {
    listsBd
      .findAll({
        where: { boardId: req.query.boardId },
        raw: true,
      })
      .then((result) => {
        console.log("boards.getBoards:", result), res.status(201).json(result);
      });
  } catch (e) {
    console.log("getAll", e);
    res.sendStatus(500);
  }
};

lists.createList = async (req, res) => {
  try {
    await listsBd
      .create({
        boardId: req.body.boardId,
        name: req.body.name,
      })
      .then((data) => {
        console.log("lists.createBoard:", data);
        res.status(201).json({ createdList: true, id: data.dataValues.id });
      });
  } catch (e) {
    console.log("createBoard: email not found", e);
    res.sendStatus(500);
  }
};

lists.deleteList = async (req, res) => {
  try {
    await listsBd.destroy({ where: { id: req.body.id }, raw: true }).then((result) => {
      console.log(result);
      res.status(201).json({ deletedList: true });
    });
  } catch (e) {
    console.log("destroyList:", e);
    res.status(500).json({
      error: true,
      message: "Id this list not found",
    });
  }
};

module.exports.lists = lists;
