const router = require("express").Router();
const {
  getUsers,
  getUser,
  postUser,
  deleteUser,
  putUser
} = require("../controllers/users.controllers");
const exists = require("../middlewares/exists");
const userService = require("../services/users");

router
  .route("/")
  .get(getUsers)
  .post(postUser);

router
  .route("/:id", exists(userService))
  .get(getUser)
  .put(putUser)
  .delete(deleteUser);

module.exports = router;
