module.exports = function(service) {
  return function(req, res, next) {
    const { id } = req.params;
    const foundResource = service.getById(id);
    if (!foundResource) {
      throw new Error("Resource was not found");
    }
    next();
  };
};
