const usersArray = require('../../users')
const cuuid = require('cuuid')

module.exports = {
  getUsers: (req, res) => {
    res.status(200).json(usersArray)
  },

  getUser: (req, res) => {
    const { id } = req.params
    const userIndex = usersArray.findIndex(user => user.id === id)
    res.status(200).json(usersArray[userIndex])
  },

  postUser: (req, res) => {
    const { firstName, lastName, age } = req.body
    const newUser = {
      id: cuuid(),
      firstName,
      lastName,
      age
    }
    usersArray.push(newUser)
    res.status(201).json(newUser)
  },

  deleteUser: (req, res) => {
    const { id } = req.params
    const userIndex = usersArray.findIndex(user => user.id === id)
    usersArray.splice(userIndex, 1)
    res.status(204).json({response: 'User deleted successfully'})
  },

  putUser: (req, res) => {
    const { id } = req.params
    const { firstName, lastName, age } = req.body
    const newUser = {
      id,
      firstName,
      lastName,
      age
    }
    const userIndex = usersArray.findIndex(user => user.id === id)
    usersArray.splice(userIndex, 1, newUser)
    res.status(200).json({response: 'User updated successfully'})
  },

  userNotFound: (req, res, next) => {
    const { id } = req.params
    const userIndex = usersArray.findIndex(user => user.id === id)
    if (userIndex === -1) {
      res.status(400).json({response: 'User not found'})
      return
    }
    next()
  },

  inputsValidation: (req, res, next) => {
    const { firstName, lastName } = req.body
    const age = parseInt(req.body.age)
    if (firstName === '' || lastName === '') {
      res.status(400).json({ response: 'FristName and lastName are required' })
      return
    }
    if (!firstName.match(/^[A-Za-z]+$/) || !lastName.match(/^[A-Za-z]+$/)) {
      res.status(400).json({ response: 'FirstName and lastName must only contain letters' })
      return
    }
    if (age <= 0 || isNaN(age)) {
      res.status(400).json({ response: 'Age must be a number greater than 0' })
      return
    }
    next()
  }
}