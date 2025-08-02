const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

let onlineUsers = {};

function receiverIDtoSocketID(receiverID) {
  return onlineUsers[receiverID];
}

io.on("connection", (socket) => {
  let userID = socket.handshake.query.userID;

  if (userID) onlineUsers[userID] = socket.id;

  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    console.log("Disconnected ID ", socket.id);
    delete onlineUsers[userID];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

module.exports = { io, server, app,receiverIDtoSocketID };
