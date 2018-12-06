$(document).ready(function(){
  var socket = io();

  var sender = $('#sender').val();

  socket.on('connect', function(){
    console.log('Yea! User Connected');

    var params = {
      name: sender
    }
    socket.emit('join', params, function(){
      console.log('User has joined this channel');
    });
  });

  socket.on('usersList', function(usersList){
    var ol = $('<ol></ol>');

    for(var i = 0; i < usersList.length; i++){
      ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">'+usersList[i]+'</a></p>');
    }

    $(document).on('click', '#val', function(){
      $('#name').text('@'+$(this).text());
      $('#receiverName').val($(this).text());
      $('#nameLink').attr("href", "/profile/"+$(this).text());
    });

    $('#users').html(ol);
  });

  socket.on('newMessage', function(data){
    var template = $('#message-template').html();
    var message = Mustache.render(template, {
      text: data.text,
      sender: data.from
    });

    $('#messages').append(message);

  });

  $('#message-form').on('submit', function(e){
    e.preventDefault();

    var msg = $('#msg').val();

    socket.emit('createMessage', {
      text: msg,
      from: sender
    }, function(){
      $('#msg').val('');
    });
  });
});
