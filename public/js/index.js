var socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
  var formattedTime = getFormattedTime(message.createdAt);
  var li = jQuery('<li></li>');
  li.text(message.from + ' ' + formattedTime + ': ' + message.text);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = getFormattedTime(message.createdAt);
  var a = jQuery('<a target="_blank">My current location</a>');
  var li = jQuery('<li></li>');
  li.text(message.from + ' ' + formattedTime + ': ');
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

function createMessage(text) {
  socket.emit('createMessage', {
    from: 'me',
    text: text
  });
}

function getFormattedTime(time) {
  if (time) {
    return moment(time).format('h:mm a');
  }
  return moment().format('h:mm a');
}

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageInput = jQuery('[name="message"]');
  var messageText = messageInput.val();
  socket.emit('createMessage', {
    from: 'User',
    text: messageInput.val()
  }, function() {
    var li = jQuery('<li></li>');
    var formattedTime = getFormattedTime();
    li.text('Me ' + formattedTime + ': ' + messageText);
    jQuery('#messages').append(li);
    messageInput.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geo Location not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(error) {
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send location');
  })
});
