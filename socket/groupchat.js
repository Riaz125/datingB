module.exports = function(io, Users){

  const users = new Users();

  io.on('connection', socket => {
    console.log('User Connected');

    socket.on('join', (params, callback) => {
      users.AddUserData(socket.id, params.name);
      usersList = users.GetUsersList();
      io.emit('usersList', usersList);

      callback();
    });

    socket.on('createMessage', (message, callback) => {
      console.log(message);
        io.emit('newMessage', {
          text: message.text,
          from: message.sender
        });

        callback();
    });

    socket.on('disconnect', () => {
      console.log(users.GetUsersList());
      console.log('socket' + socket.id);
      var user = users.RemoveUser(socket.id);
      var usersList = users.GetUsersList();
      console.log(user)
      console.log('disconnected');
      console.log(users.GetUsersList());

      if(user){
        io.emit('usersList', usersList);
      }
    })
  });
}
