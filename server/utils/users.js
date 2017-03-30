class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var userIndex = this.indexById(id);
    if (userIndex === -1) {
      return null;
    }
    var out = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return out;
  }

  getUser (id) {
    var userIndex = this.indexById(id);
    if (userIndex === -1) {
      return null;
    }
    return this.users[userIndex];
  }

  getUserList(room) {
    return this.users.filter((user) => {
      return user.room === room;
    }).map((user) => user.name);
  }

  indexById(id) {
    for(var i = 0; i < this.users.length; i += 1) {
        if(this.users[i].id === id) {
            return i;
        }
    }
    return -1;
  }
}

module.exports = {
  Users
};
