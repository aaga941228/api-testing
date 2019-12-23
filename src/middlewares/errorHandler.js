module.exports = function(err, req, res) {
  res.status(err.status || 5000).send("error");
};
