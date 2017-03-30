const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: 'Neil',
        room: 'Red fans'
      },
      {
        id: 2,
        name: 'Gaz',
        room: 'Blue fans'
      },
      {
        id: 3,
        name: 'Debz',
        room: 'Red fans'
      },
    ]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Neil',
      room: 'Red fans'
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var deleted = users.removeUser(2);
    expect(users.users.length).toBe(2);
    expect(deleted).toEqual({
      id: 2,
      name: 'Gaz',
      room: 'Blue fans'
    });
  });

  it('should not remove a user', () => {
    var deleted = users.removeUser(17);
    expect(users.users.length).toBe(3);
    expect(deleted).toEqual(null);
  });

  it('should find a user', () => {
    var found = users.getUser(3);
    expect(found).toEqual(users.users[2]);
    expect(found.id).toBe(3);
  });

  it('should not find a user', () => {
    var found = users.getUser(21);
    expect(found).toEqual(null);
  });

  it('should get a list of names', () => {
    var userList = users.getUserList('Red fans');
    expect(userList).toEqual(['Neil', 'Debz']);
    var userList = users.getUserList('Blue fans');
    expect(userList).toEqual(['Gaz']);
  });
});
