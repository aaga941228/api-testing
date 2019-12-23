const router = require("express").Router();
const {
  getUsers,
  getUser,
  postUser,
  deleteUser,
  putUser
} = require("../controllers/users.controllers");
const exists = require('../middlewares/exists')

router
  .get("/", getUsers)
  .get("/:id", exists(userService), getUser)
  .post("/", inputsValidation, postUser)
  .put("/:id", exists(userService), putUser);
  .delete("/:id", exists(userService), deleteUser)

module.exports = router;
