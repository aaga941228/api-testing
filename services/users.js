const { userModel } = require("../database/sequelize");

const userService = {
  getAll: (limit, offset, order) => userModel.findAll({ order, offset, limit }),
  getById: id => userModel.findOne({ where: { id } }),
  getByFirstName: firstName => userModel.findAll({ where: { firstName } }),
  createOne: user => userModel.create(user),
  updateOne: (user, id) => userModel.update(user, { where: { id } }),
  deleteOne: id => userModel.destroy({ where: { id } })
};

module.exports = userService;
