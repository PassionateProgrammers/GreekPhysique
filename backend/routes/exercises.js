const express = require('express')

const { getAllExercises, getExercisesByGroup} = require('../controllers/exerciseController')

const router = express.Router()

router.get('/', getAllExercises)

router.get('/:name', getExercisesByGroup)


module.exports = router