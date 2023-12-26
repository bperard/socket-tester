'use strict';

const { Server } = require("socket.io");

const server = new Server({
  cors: {
    origin: '*'
  }
});

const PORT = 3001;

server.on('connection', (socket) =>{
  console.log(`User ${socket.id} has connected.`);

  socket.on('addMessage', (newMessage) => {
    const addMessage = {
      date: Date.now(),
      SID: socket.id,
      message: newMessage,
    };
    server.emit('addMessage', addMessage);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} has disconnected.`)
  });
});

server.on('connection_error', (err) => {
  console.log(` ERROR: ${err.message} ${err}`);
})

function connectServer() {
  server.listen(PORT);
  console.log(`Server listening on port ${PORT}.`)
}

connectServer();
