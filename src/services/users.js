const users = [];

const userService = {
  createOne: user => users.push(user),
  getAll: () => users,
  getById: id => users[id],
  updateOne: (user, id) => (users[id] = user),
  deleteOne: id => {
    users[id] = undefined;
  }
};

module.exports = userService;
