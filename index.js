const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// initializing
const app = express()

// settings
app.set('port', process.env.PORT || 8080)

// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// routes
app.use(require('./src/routes/routes'))


app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`)
})

module.exports = app