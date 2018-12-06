class Users {
  constructor(){
     this.users = [];
  }

  AddUserData(id, name){
    var users = {id, name}
    this.users.push(users);
    return users;
  }

  RemoveUser(id){
    var user = this.GetUser(id);
    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  GetUser(id){
    var getUser = this.users.filter((userId) => {
      userId.id === id;
    })[0];
    return getUser;
  }
  GetUsersList(){
    var namesArray = this.users.map(user => user.name);
    return namesArray;
  }
}

module.exports = {Users};
