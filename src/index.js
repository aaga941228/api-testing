const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const morgan = require("morgan");

// initializing
const app = express();

// settings
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
app.use("/", require("./routes"));
app.use("/users", require("./routes/users"));

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

module.exports = app;
