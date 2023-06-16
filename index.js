const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const axios = require("axios");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// SOCKET IO
io.on("connection", (socket) => {
  console.log("soket connect success :", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected ", socket.id);
  });

  //order
  socket.on("display_1", () => {
    
    //io.sockets.emit("shop", data)
    try {
      axios
        .get("https://bankcash1.herokuapp.com/Show")
        .then((result) => io.sockets.emit("show_display_1", result.data))
        .catch((err) => res.send(err));
    } catch (err) {
      console.error("GG", err);
    }
  });
});

// START SERVER
server.listen(process.env.PORT || 3001, () => {
  console.log("server Running is 3001");
});
