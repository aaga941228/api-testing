module.exports = function(service) {
  return async function(req, res, next) {
    try {
      const { id } = req.params;
      const user = await service.getById(id);
      if (!user) {
        throw new Error("Resource was not found");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
