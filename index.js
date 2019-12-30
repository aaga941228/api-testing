const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
require("./database/sequelize");

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(morgan("dev"));

app.use("/", require("./routes"));
app.use("/users", require("./routes/users"));
app.use((req, res, next) => {
  try {
    throw new Error("not found");
  } catch (err) {
    next(err);
  }
});
app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

module.exports = app;
