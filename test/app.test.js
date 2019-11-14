const supertest = require('supertest')
const mocha = require('mocha')
const { expect } = require('chai')
const app = require('../app')
const users = require('../users')

describe('appointment app', function () {

  it('should return an obect with users', function (done) {
    supertest(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err
        }

        expect({ users: res.body.users }).to.be.deep.equal({ users })
        done()
      })
  });

  it('should return an object with one user', function (done) {
    supertest(app)
      .get('/user/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err
        }

        const expectResult = {
          user: {
            "id": 1,
            "firstName": "Leanne",
            "lastName": "Graham",
            "age": 34
          }
        }
        expect(res.body).to.be.deep.equal(expectResult)
        done()
      })
  })

  it('should return an error when request an non exist user', function (done) {
    supertest(app)
      .get('/user/12')
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err, res) => {
        if (err) {
          throw err
        }

        expect(res.body).to.be.deep.equal({})
        done()
      })
  })

  it('should add a new user when add a user', function (done) {
    supertest(app)
      .post('/users')
      .send({
        firstName: 'john',
        lastName: 'doe',
        age: 21
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err
        }

        const expectedUser = {
          id: 10,
          firstName: 'john',
          lastName: 'doe',
          age: 21
        }

        expect(res.body.user).to.be.deep.equal(expectedUser)
        done()
      })
  })

  it('should return an error when pass a empty user', function (done) {
    supertest(app)
      .post('/user')
      .send({
        firstName: '',
        lastName: '',
        age: ''
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err
        }

        const expectedResponse = {
          response: 'fristName and lastName are required'
        }

        expect(res.body).to.be.deep.equal(expectedResponse)
        done()
      })
  })

  it('should return an error when pass a age equal or less than 0', function (done) {
    supertest(app)
      .post('/user')
      .send({
        firstName: 'jonh',
        lastName: 'doe',
        age: 0
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err
        }

        const expectedResponse = {
          response: 'age must be a number greater than 0'
        }

        expect(res.body).to.be.deep.equal(expectedResponse)
        done()
      })
  })

  it('should return an error when try to pass a firstName or lastName invalid', function (done) {
    supertest(app)
      .post('/user')
      .send({
        firstName: '83gsae',
        lastName: '35',
        age: 18
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err
        }

        const expectedResponse = {
          response: 'firstName and lastName must be a String'
        }

        expect(res.body).to.be.deep.equal(expectedResponse)
        done()
      })
  })

  it('should delete a user', function (done) {
    supertest(app)
      .delete('/user/1')
      .expect(204)
      .end((err, res) => {
        if (err) {
          throw err
        }

        expect(res.body).to.be.deep.equal({})
        done()
      })
  })

  it('should return an error when trying to delete a non existing user', function (done) {
    supertest(app)
      .delete('/user/45')
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err
        }

        expect(res.body).to.be.deep.equal({})
        done()
      })
  })

  it('should update an user', function (done) {
    supertest(app)
      .put('/user/1')
      .send({
        firstName: 'jonh',
        lastName: 'doe',
        age: 21
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err
        }

        const expectedResponse = {
          response: 'user updated successfully'
        }
        expect(res.body).to.be.deep.equal(expectedResponse)
        done()
      })
  })

  it.only('should return an error when pass an inexistentid', function (done) {
    supertest(app)
      .put('/user/25')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err
        }

        const expectedResponse = {
          response: 'user not found'
        }
        expect(res.body).to.be.deep.equal(expectedResponse)
        done()
      })
  })
})

