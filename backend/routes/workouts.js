const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg: 'Gets all workouts}'})
})

router.get('/:id', (req, res) => {
    res.json({mssg: 'Gets one workout'})
})

router.post('/', (req, res) => {
    res.json({mssg: 'Post a workout'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'Delete a workout'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'Update a workout'})
})

module.exports = router