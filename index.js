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
    origin: ["http://localhost:5173","https://shrine-auction-app.netlify.app", "http://192.168.1.149:5173"],
    methods: ["GET", "POST"],
  },
});

// SOCKET IO
io.on("connection",  (socket) => {
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

    socket.on("display_2",  () => {
    try {
      axios
        .get("https://bankcash1.herokuapp.com/Show")
        .then((result) => io.sockets.emit("show_display_2", result.data))
        .catch((err) => res.send(err));
    } catch (err) {
      console.error("GG", err);
    }
  });

  socket.on("display_3", () => {
    try {
      axios
        .get("https://bankcash1.herokuapp.com/Show/List/Top")
        .then((result) => io.sockets.emit("show_display_3", result.data))
        .catch((err) => res.send(err));
    } catch (err) {
      console.error("GG", err);
    }
  });

  socket.on("display_4", () => {
    const data = "ลบแล้ว"
    io.sockets.emit("show_display_4", data)
  });
  

  // Number 0
  socket.on("number_0", () => {
    const data = " "
    io.sockets.emit("show_number_0", data)
  });

  // Number 1
  // socket.on("number_1", () => {
  //   const data = "1"
  //   io.sockets.emit("show_number_1", data)
  // });

    // Number 2
    socket.on("number_2", () => {
      const data = "2"
      io.sockets.emit("show_number_2", data)
    });

      // Number 3
  socket.on("number_3", () => {
    const data = "3"
    io.sockets.emit("show_number_3", data)
  });

        // Number 3
        socket.on("number_4", () => {
          try {
            axios
              .get("https://bankcash1.herokuapp.com/Show")
              .then((result) => io.sockets.emit("show_number_4", result.data))
              .catch((err) => res.send(err));
          } catch (err) {
            console.error("GG", err);
          }
          // const data = "4"
          // io.sockets.emit("show_number_4", data)
        });
      


});


// SOCKET IO 2
io.on("connection", (socket) => {
  console.log("soket connect success-2 :", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected-2 ", socket.id);
  });

    // Number 1
    socket.on("number_1", () => {
      const data = "1"
      io.sockets.emit("show_number_1", data)
    });

});

// START SERVER
server.listen(process.env.PORT || 3001, () => {
  console.log("server Running is 3001");
});
