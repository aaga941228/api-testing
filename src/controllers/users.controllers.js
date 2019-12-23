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
    userService.createOne(user);
    const response = !!result.error
      ? result.error.details
      : "User created successfully";
    const status = !!result.error ? 400 : 201;
    res.status(status).send(response);
  },

  deleteUser: (req, res) => {
    const { id } = req.params;
    userService.deleteOne(id);
    const status = !!result.error ? 400 : 204;
    res.status(status).send("User deleted successfully");
  },

  putUser: (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const result = userSchema.validate(user);
    userService.updateOne(user, id);
    const response = !!result.error
      ? result.error.details
      : "User updated successfully";
    const status = !!result.error ? 400 : 200;
    res.status(status).send(response);
  }
};
