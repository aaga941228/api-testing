const router = require('express').Router()
const { getUsers, getUser, postUser, deleteUser, putUser, userNotFound, inputsValidation } = require('../controllers/index.controllers')

router
  .get('/', getUsers)
  .use('/:id', userNotFound)
  .get('/:id', getUser)
  .delete('/:id', deleteUser)
  .post('/', inputsValidation, postUser)
  .put('/:id', inputsValidation, putUser)


module.exports = router

