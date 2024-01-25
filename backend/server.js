const express = require('express')
require('dotenv').config()

//express application
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const exerciseRoutes = require('./routes/exercises')
const userRoutes = require('./routes/user')

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//route
app.use('/api/exercises', exerciseRoutes)
app.use('/api/user', userRoutes)

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