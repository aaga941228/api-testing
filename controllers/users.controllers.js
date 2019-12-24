const userService = require("../services/users");
const userSchema = require("../schemas/users");

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getAll();
      res.send(users);
    } catch (err) {
      next(err);
    }
  },

  getUser: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await userService.getById(id);
      res.send(user);
    } catch (err) {
      next(err);
    }
  },

  postUser: async (req, res, next) => {
    const user = req.body;
    const result = userSchema.validate(user);
    try {
      if (!!result.error) {
        const message = result.error.details[0].message;
        throw new Error(message);
      }
      await userService.createOne(user);
      res.send(!!result.error ? result.error.details : result.value);
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    const { id } = req.params;
    try {
      await userService.deleteOne(id);
      res.send("User deleted successfully");
    } catch (err) {
      next(err);
    }
  },

  putUser: async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const result = userSchema.validate(user);
    try {
      if (!!result.error) {
        const message = result.error.details[0].message;
        throw new Error(message);
      }
      await userService.updateOne(user, id);
      res.send(!result.error && result.value);
    } catch (err) {
      next(err);
    }
  }
};
