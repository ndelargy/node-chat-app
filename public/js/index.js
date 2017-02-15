var socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
  console.log(message);
});

function createMessage(text) {
  socket.emit('createMessage', {
    from: 'me',
    text: text
  });
}
