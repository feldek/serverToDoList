const express = require("express");
const routes = require("./routes/routes");
const { users } = require("./routes/sequelize/users");
const PORT = process.env.PORT || 3004;
const host = `https://server-to-do-list.herokuapp.com/`;
const hostToDoList = "https://todolist-i3aitifi9.vercel.app/";
const app = express();


app.listen(PORT, () => {
  console.log("Server has been started...");
});

app.use(express.urlencoded());
app.use(express.json());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.use("/", routes);

module.exports.PORT = PORT;
module.exports.host = host;
module.exports.hostToDoList = hostToDoList;
