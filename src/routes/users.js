const router = require("express").Router();
const {
  getUser,
  postUser,
  deleteUser,
  putUser,
  userNotFound,
  inputsValidation
} = require("../controllers");

router
  .use("/:id", userNotFound)
  .get("/:id", getUser)
  .delete("/:id", deleteUser)
  .post("/", inputsValidation, postUser)
  .put("/:id", inputsValidation, putUser);

module.exports = router;
