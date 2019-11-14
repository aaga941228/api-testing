const router = require('express').Router()
let users = require('./users')
const cuuid = require('cuuid')

router

  .get('/users', (req, res) => {
    res.status(200).json(users)
  })

  .get('/user/:id', (req, res) => {
    const { id } = req.params
    const user = users.find((e) => {
      if (e.id == id) return e
    })
    res.status(user ? 200 : 404).json(user ? { user } : {})
  })

  .post('/users', (req, res) => {
    const { firstName, lastName } = req.body
    const age = Number(req.body.age)
    if (firstName === '' || lastName === '') {
      res.status(400).json({ response: 'fristName and lastName are required' })
      return
    }
    if (firstName.match(/[^A-Za-z]+/) || lastName.match(/[^A-Za-z]+/)) {
      res.status(400).json({ response: 'firstName and lastName must be a String' })
      return
    }
    if (age <= 0 || isNaN(age)) {
      res.status(400).json({ response: 'age must be a number greater than 0' })
      return
    }
    const newUser = {
      id: cuuid(),
      firstName,
      lastName,
      age
    }
    users.push(newUser)
    res.status(201).json({ user: newUser })
  })

  .delete('/user/:id', (req, res) => {
    const { id } = req.params
    const user = users.find((e) => {
      if (e.id == id) return e
    })
    if (user === undefined) {
      res.status(400).json({})
      return
    }
    const index = users.indexOf(user)
    users.splice(index, 1)
    res.status(204).json({})
  })

  .put('/user/:id', (req, res) => {
    const { id } = req.params
    const user = users.find((e) => {
      if (e.id == id) return e
    })
    if (user === undefined) {
      res.status(400).json({ response: 'user not found' })
      return
    }
    const { firstName, lastName } = req.body
    if (firstName === '' || lastName === '') {
      res.status(400).json({ response: 'fristName and lastName are required' })
      return
    }
    if (firstName.match(/[^A-Za-z]+/) || lastName.match(/[^A-Za-z]+/)) {
      res.status(400).json({ response: 'firstName and lastName must be a String' })
      return
    }
    if (age <= 0 || isNaN(age)) {
      res.status(400).json({ response: 'age must be a number greater than 0' })
      return
    }
    const newUser = {
      id,
      firstName,
      lastName,
      age
    }
    const index = users.indexOf(user)
    users.splice(index, 1, newUser)
    res.status(200).json({
      response: 'user updated successfully'
    })
  })

module.exports = router

