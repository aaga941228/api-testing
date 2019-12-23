const userService = require("../services/users");
const userSchema = require("../schemas/users");

module.exports = {
  getUsers: (req, res) => {
    const users = userService.getAll();
    res.status(200).json(users);
  },

  getUser: (req, res) => {
    const { id } = req.params;
    const user = userService.getById(id);
    res.status(200).send(user);
  },

  postUser: (req, res) => {
    const user = req.body;
    const result = userSchema.validate(user);
    userService.create(user);
    res.send(result.error);
  },

  deleteUser: (req, res) => {
    const { id } = req.params;
    userService.delete(id);
    res.status(204).json("User deleted successfully");
  },

  putUser: (req, res) => {
    res.send("User updated successfully");
  }
};
