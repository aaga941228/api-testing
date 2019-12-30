module.exports = function(req, res, next) {
  try {
    const { query } = req;
    for (item in query) {
      switch (Object.values(item)[0]) {
        case "firstName":
          if (!/^[a-zA-Z0-9]+$/.test(firstName)) {
            throw new Error("first name must be a valid string");
          }
          break;
        case "lastName":
          if (!/^[a-zA-Z0-9]+$/.test(firstName)) {
            throw new Error("last name must be a valid string");
          }
          break;
        default:
          next();
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};
