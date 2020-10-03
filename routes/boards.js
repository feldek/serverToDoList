const { boards: boardsBd } = require("./sequelize/boards");
const { users } = require("./sequelize/users");

let boards = {};

boards.getBoards = async (req, res) => {
  try {
    users
      .findAll({
        where: { email: req.query.email },
        include: {
          model: boardsBd,
          attributes: [],
        },
        attributes: ["boards.name", "boards.id"],
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

boards.createBoard = async (req, res) => {
  try {
    await users
      .findOne({
        where: { email: req.body.email },
        attributes: ["id"],
        raw: true,
      })
      .then((result) => {
        boardsBd
          .create({
            userId: result.id,
            name: req.body.name,
          })
          .then((data) => {
            console.log("boards.createBoard:", data);
            res.status(201).json({ createdBoard: true, id: data.dataValues.id });
          });
      });
  } catch (e) {
    console.log("createBoard: email not found", e);
    res.sendStatus(500);
  }
};

boards.deleteBoard = async (req, res) => {
  try {
    await boardsBd.destroy({ where: { id: req.body.id }, raw: true }).then((result) => {
      console.log(result);
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
