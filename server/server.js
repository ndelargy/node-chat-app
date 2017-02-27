const path = require('path');
const http = require('http');
const express = require('express');

const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });

  socket.on('createMessage', (message) => {
    console.log(message);
    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
});

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index.html')
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
