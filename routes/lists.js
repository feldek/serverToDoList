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

// db.users.findAll({
//   where: { id: req.user.id },
//   include: {
//     model: db.boards,
//     attributes: [],
//     include: {
//       model: db.lists,
//       attributes: [],
//     },
//   },
//   attributes: ["boards.lists.name", "boards.lists.id", "boards.lists.boardId"],
//   raw: true,
// });

let test = {
  req: {
    query: {
      boardId: "04d107de-5d62-4efa-bd59-9219dcaf6477",
      userId: "56e3c7f1-5930-4384-92f9-4f64c2409aec",
      listId: "54d102de-5d63-2efa-bd59-0219dcaf6477",
    },
  },
};

// let test1 = db.lists
//   .findAll({
//     include: {
//       model: db.boards,
//       include: {
//         model: db.users,
//         where: { id: test.req.query.userId },
//         attributes: [],
//       },
//       attributes: [],
//     },
//     raw: true,
//   })
//   .then((res) => console.log(res));
// console.log(test1);

lists.getCurrentLists = async (req, res) => {
  console.log(req.query.boardId);
  try {
    db.lists
      .findAll({
        where: { boardId: req.query.boardId },
        raw: true,
      })
      .then((result) => {
        console.log("lists.getCurrentLists:", result), res.status(200).json(result);
      });
  } catch (e) {
    console.log("lists.getCurrentLists:", e);
    res.sendStatus(500);
  }
};

lists.createList = async (req, res) => {
  try {
    await db.lists
      .create({
        boardId: req.body.boardId,
        name: req.body.name,
      })
      .then((data) => {
        console.log("lists.createList:", data);
        res.status(201).json({ createdList: true, id: data.dataValues.id });
      });
  } catch (e) {
    console.log("lists.createList:", e);
    res.sendStatus(500);
  }
};

lists.deleteList = async (req, res) => {
  try {
    await db.lists.destroy({ where: { id: req.body.id }, raw: true }).then((result) => {
      console.log(result);
      res.status(200).json({ deletedList: true });
    });
  } catch (e) {
    console.log("lists.deleteList:", e);
    res.status(500).json({
      error: true,
      message: "Id this list not found",
    });
  }
};

module.exports.lists = lists;
