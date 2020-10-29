const db = require("../db/models");

let boards = {};

boards.getBoards = async (req, res) => {
  try {
    console.log("boards.getBoards, req.user.id:", req.user.id);
    let currentBoards = await db.boards.findAll({
      where: { userId: req.user.id },
      attributes: ["name", "id"],
      raw: true,
    });
    console.log("boards.getBoards:", currentBoards);
    res.status(201).json(currentBoards);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

boards.createBoard = async (req, res) => {
  try {
    let newBoard = req.body.id
      ? await db.boards.create({
          userId: req.user.id,
          name: req.body.name,
          id: req.body.id,
        })
      : await db.boards.create({
          userId: req.user.id,
          name: req.body.name,
        });
    console.log("boards.createBoard:", newBoard);
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

boards.deleteBoard = async (req, res) => {
  try {
    await db.boards.destroy({ where: { id: req.body.id }, raw: true });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports = boards;
