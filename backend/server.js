const express = require('express')
require('dotenv').config()

//express application
const app = express()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//route
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
    app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
    })
    })
    .catch((error) => {
        console.log(error)
    })