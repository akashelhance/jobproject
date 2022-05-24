import express from "express";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import dotenv from 'dotenv';
import 'express-async-errors'
import morgan from 'morgan'
//db and authectivateuser
import connectDB from './db/connect.js'
import authenticateUser from './middleware/auth.js'
//routes

import authRoute from './routes/authRoutes.js'

dotenv.config()


const app = express();

app.use(express.json())
//middleware
notFoundMiddleware
errorHandlerMiddleware


if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
    // throw new Error('error')
    res.send('Welcome')
})

app.use('/api/v1/auth',authRoute)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT;


const start = async () => {
    try {
      await connectDB('mongodb://127.0.0.1:27017/jobproject')
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`)
      })
    } catch (error) {
      console.log(error)
    }
  }

start()