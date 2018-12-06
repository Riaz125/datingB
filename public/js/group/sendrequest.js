$(document).ready(function(){
  var socket = io();

  var sender = $('#sender').val();

  socket.on('connect', function(){
    var params = {
      sender: sender
    }

    socket.emit('joinRequest', params, function(){
      console.log('Joined');
    })
  });

  socket.on('newFriendRequest', function(friend){
    console.log(friend);
  });

  $('#add_friend').on('submit', function(e){
    console.log('submitted request');
    e.preventDefualt();

    var receiverName = $('#receiverName').val();

    $.ajax({
      url: '/group/',
      type: 'POST',
      data: {
        receiver: receiverName,
        sender: sender
      },
      success: function(){
        socket.emit('friendRequest', {
          receiver: receiverName,
          sender: sender
        }, function(){
          console.log('Request Sent');
        })
      }
    })
*/
  });
});
