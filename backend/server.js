require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const mealRoutes = require('./routes/meal')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/meal', mealRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for request
        app.listen(process.env.PORT, () =>{
        console.log('connected to db & listening on Port', process.env.PORT)
    })
    })
    .catch((error) => {
        console.log(error)
    })