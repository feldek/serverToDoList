const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const routes = require("./routes/routes");
const port = process.env.PORT || 3004;
const app = express();

app.use(express.urlencoded());
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", " POST", "DELETE", "PATCH"],
  allowedHeaders: "Content-Type, Authorization,X-Custom-Header",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(routes);

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
require("./routes/chat/chat.js")(io);
