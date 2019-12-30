const userService = require("../services/users");
const userSchema = require("../schemas/users");
const { Op } = require("sequelize");

module.exports = {
  getUsers: async (req, res, next) => {
    const {
      page = 1,
      per_page = 10,
      sort,
      sort_by = "ASC",
      firstName,
      lastName,
      birthYear
    } = req.query;
    try {
      const limit = parseInt(per_page);
      const offset = parseInt(per_page) * (parseInt(page) - 1);
      const order = !!sort ? [[`${sort}`, `${sort_by}`]] : [];
      const params = { where: {}, order, limit, offset };

      if (!!firstName) {
        params.where.firstName = firstName;
      }
      if (!!lastName) {
        params.where.lastName = lastName;
      }
      if (!!birthYear) {
        const properties = Object.getOwnPropertyNames(birthYear);
        if (properties.length !== 1) {
          params.where.birthYear = birthYear;
        }
        switch (properties[0]) {
          case "lt":
            params.where.birthYear = { [Op.lt]: birthYear.lt };
            break;
          case "gt":
            params.where.birthYear = { [Op.gt]: birthYear.gt };
            break;
          case "lte":
            params.where.birthYear = { [Op.lte]: birthYear.lte };
            break;
          case "gte":
            params.where.birthYear = { [Op.gte]: birthYear.gte };
            break;
        }
      }

      const users = await userService.getAll(params);
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
        const error = new Error(message);
        next(error);
      } else {
        await userService.createOne(user);
        res.send(!!result.error ? result.error.details : result.value);
      }
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

  putUser: async (req, res, next) => {
    const { id } = req.params;
    const user = req.body;
    const result = userSchema.validate(user);
    try {
      if (!!result.error) {
        const message = result.error.details[0].message;
        const error = new Error(message);
        next(error);
      } else {
        await userService.updateOne(user, id);
        res.send(!result.error && result.value);
      }
    } catch (err) {
      next(err);
    }
  }
};
