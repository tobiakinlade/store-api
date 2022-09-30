const express = require('express')
require('dotenv').config()
const app = express()
const connectDB = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products routes </a>')
})

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 8080

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
