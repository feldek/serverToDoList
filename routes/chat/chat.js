module.exports = function (io) {
  const chat = io.of("/chat-rooms");

  let users = [];
  let counter = 0;
  const nickNameColors = [
    "DarkRed",
    "Indigo",
    "DarkGreen",
    "DarkBlue",
    "DarkKhaki",
    "Teal",
    "MediumVioletRed",
  ];

  chat.on("connection", (socket) => {
    console.log("nsp New client connected", socket.id);

    let addedUser = false;
    socket.on("new user", (item) => {
      if (addedUser) {
        return;
      }
      if (users.some((el) => el.userName === item.userName)) {
        console.log(item.userName, "NickName is already taken");
        socket.emit("new user", {
          status: false,
          error: "This nickName is already taken",
        });
      } else {
        console.log("userName confirmed :", item.userName);
        addedUser = true;
        if (counter >= nickNameColors.length) {
          counter = 0;
        }
        let nickNameColor = nickNameColors[counter];
        counter++;
        socket.userName = item.userName;
        users.push({ userName: socket.userName, id: socket.id, nickNameColor });
        socket.emit("new user", { status: true, nickNameColor });
      }
    });

    socket.on("chat_1", (data) => {
      console.log(socket.userName, data);
      chat.emit("chat_1", {
        userName: socket.userName,
        message: data.message,
        nickNameColor: data.nickNameColor,
      });
    });

    socket.on("chat_2", (data) => {
      console.log(socket.userName, data);
      chat.emit("chat_2", {
        userName: socket.userName,
        message: data.message,
        nickNameColor: data.nickNameColor,
      });
    });

    socket.on("chat_3", (data) => {
      console.log(socket.userName, data);
      chat.emit("chat_3", {
        userName: socket.userName,
        message: data.message,
        nickNameColor: data.nickNameColor,
      });
    });

    socket.on("chat_4", (data) => {
      console.log(socket.userName, data);
      chat.emit("chat_4", {
        userName: socket.userName,
        message: data.message,
        nickNameColor: data.nickNameColor,
      });
    });

    socket.on("disconnect", () => {
      users = users.filter((el) => el.id !== socket.id);
      console.log("nsp user disconnected");
    });
  });
};
