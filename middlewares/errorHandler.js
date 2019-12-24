module.exports = function(err, req, res) {
  res.status(err.statusCode).send(err.message);
};
