const router = require('express').Router()
const { getUsers, getUser, postUser, deleteUser, putUser, userNotFound, inputsValidation } = require('../controllers/index.controllers')

router
  .get('/users', getUsers)
  .use(userNotFound)
  .get('/user/:id', getUser)
  .delete('/user/:id', deleteUser)
  .use(inputsValidation)
  .post('/users', postUser)
  .put('/user/:id', putUser)


module.exports = router

