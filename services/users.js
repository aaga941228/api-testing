const { userModel } = require("../database/sequelize");

const userService = {
  getAll: params => userModel.findAll(params),
  getById: id => userModel.findOne({ where: { id } }),
  createOne: user => userModel.create(user),
  updateOne: (user, id) => userModel.update(user, { where: { id } }),
  deleteOne: id => userModel.destroy({ where: { id } })
};

module.exports = userService;
