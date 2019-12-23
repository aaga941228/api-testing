const express = require("express");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const morgan = require("morgan");

// initializing
const app = express();

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use((req, res, next) => {
  app.locals.errorMessage = req.flash("errorMessage");
  next();
});

// routes
app.use("/", require("./routes"));
app.use("/users", require("./routes/users"));

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

module.exports = app;
