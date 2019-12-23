const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");

// initializing
const app = express();
require("./database/sequelize");

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/", require("./routes"));
app.use("/users", require("./routes/users"));
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

module.exports = app;
