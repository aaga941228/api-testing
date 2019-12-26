const router = require("express").Router();
const {
  getUsers,
  getUser,
  getUserByFirstName,
  postUser,
  deleteUser,
  putUser
} = require("../controllers/users.controllers");
const exists = require("../middlewares/exists");
const userService = require("../services/users");

router
  .get("/", getUsers)
  .post("/", postUser)
  .get("/search", getUserByFirstName)
  .get("/:id", exists(userService), getUser)
  .put("/:id", exists(userService), putUser)
  .delete("/:id", exists(userService), deleteUser);

module.exports = router;
