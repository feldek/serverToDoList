const db = require("../db/models");

let boards = {};

boards.getBoards = async (req, res) => {
  try {
    console.log("boards.getBoards, req.user.id:", req.user.id);
    let currentBoards = await db.boards.findAll({
      include: { model: db.users, where: { id: req.user.id }, attributes: [] },
      attributes: ["name", "id"],
      raw: true,
    });
    console.log("boards.getBoards:", currentBoards);
    res.status(201).json(currentBoards);
  } catch (e) {
    console.log("boards.getBoards", e);
    res.sendStatus(500);
  }
};

boards.createBoard = async (req, res) => {
  try {
    let newBoard = await db.boards.create({
      userId: req.user.id,
      name: req.body.name,
    });
    console.log("boards.createBoard:", data);
    res.status(201).json({ createdBoard: true, id: data.dataValues.id });
  } catch (e) {
    console.log("createBoard: email not found", e);
    res.sendStatus(500);
  }
};
// boards.createBoard = async (req, res) => {
//   try {
//     db.users
//       .findOne({
//         where: { id: req.user.id },
//         attributes: ["id"],
//         raw: true,
//       })
//       .then((result) => {
//         db.boards
//           .create({
//             userId: result.id,
//             name: req.body.name,
//           })
//           .then((data) => {
//             console.log("boards.createBoard:", data);
//             res.status(201).json({ createdBoard: true, id: data.dataValues.id });
//           });
//       });
//   } catch (e) {
//     console.log("createBoard: email not found", e);
//     res.sendStatus(500);
//   }
// };

boards.deleteBoard = async (req, res) => {
  try {
    await db.boards.destroy({ where: { id: req.body.id }, raw: true }).then((result) => {      
      res.status(201).json({ deletedBoard: true });
    });
  } catch (e) {
    console.log("destroyBoard: id not found", e);
    res.status(500).json({
      error: true,
      message: "Id this board not found",
    });
  }
};

module.exports.boards = boards;
