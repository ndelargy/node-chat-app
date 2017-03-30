var socket = io();

function scrollToBottom() {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server.');
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (error) {
    if (error) {
      alert(error);
      window.location.href = '/';
    }
    else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function(userName) {
    ol.append('<li>' + userName + '</li>');
  });
  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {

  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    formattedTime: getFormattedTime(message.createdAt)
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    formattedTime: getFormattedTime(message.createdAt)
  });
  jQuery('#messages').append(html);
  scrollToBottom();
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
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      from: 'Me',
      text: messageInput.val(),
      formattedTime: getFormattedTime()
    });
    jQuery('#messages').append(html);
    messageInput.val('');
    scrollToBottom();
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
