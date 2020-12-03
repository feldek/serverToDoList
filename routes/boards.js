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
    res.status(500).json({});    
  }
};

boards.createBoard = async (req, res) => {
  try {
    const newBoard = await db.boards.create({
      userId: req.user.id,
      name: req.body.name,
      id: req.body.id,
    });
    
    console.log("boards.createBoard:", newBoard);
    res.status(201).json({});    
  } catch (e) {
    console.log(e);
    res.status(500).json({});    
  }
};

boards.deleteBoard = async (req, res) => {
  try {
    await db.boards.destroy({ where: { id: req.body.id }, raw: true });
    res.status(200).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};

module.exports = boards;
