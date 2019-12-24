const createError = require("http-errors");

module.exports = function(service) {
  return async function(req, res, next) {
    const { id } = req.params;
    try {
      const user = await service.getById(id);
      if (!user) {
        next(createError(404));
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
