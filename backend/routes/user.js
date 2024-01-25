const express = require('express')

//controller functions
const { signupUser, loginUser, addExercise } = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)

//singup route
router.post('/signup', signupUser)

// Add exercises to program route
router.post('/:userId/program/:programId/add-exercise', addExercise);

module.exports = router