module.exports = function(err, req, res) {
  req.flash("errorMessage", "User not found");
  res.status(err.status || 5000).send("error");
};
