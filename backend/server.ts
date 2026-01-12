import { activateUser, userLeavesApp, UsersState } from "./state";

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: "*", // Allow your React app's origin
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
 
  activateUser(socket.id);

  console.log("Users: ", UsersState.users)

  io.emit('USERS_LIST', UsersState.users);

  socket.on('ENTER_CHAT', (msg) => { 
    const room = msg.id;
    socket.to(room).emit('ENTER_CHAT', {id: socket.id, name: msg.myName })  
  });

  socket.on('QUIT_CHAT', (room, name) => {
    if (room) {
       socket.to(room).emit('QUIT_CHAT', name)
    }  
  });

  socket.on('CHAT_MESSAGE', (txt, room) => {
    if (room) {
       socket.to(room).emit('CHAT_MESSAGE', { txt, id: room })
    }  
  });

  socket.on('disconnect', () => {
    userLeavesApp(socket.id);
    console.log("Disconnected User")
    console.log("Users: ", UsersState.users)
    io.emit('USERS_LIST', UsersState.users);
  })
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});


