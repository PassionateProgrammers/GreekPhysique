const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
  
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // signup user
  const signupUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
  
    try {
      const user = await User.signup(firstname, lastname, email, password);
      const token = createToken(user._id);
  
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };  

const addProgram = async (req, res) => {
    const userId = req.params.userId;
    const programData = req.body;

    try {
        const user = await User.addExerciseToProgram(userId, programData);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const removeProgram = async (req, res) => {
    const userId = req.params.userId;
    const programId = req.params.programId;

    try {
        const user = await User.removeProgram(userId, programId);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addExercise = async (req, res) => {
    const userId = req.params.userId;
    const programId = req.params.programId;
    const exerciseToAdd = req.body.exerciseToAdd;

    try {
        const user = await User.addExerciseToProgram(userId, programId, exerciseToAdd);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const replaceExercisesInProgram = async (req, res) => {
    const userId = req.params.userId;
    const programId = req.params.programId;
    const newExercises = req.body.newExercises;

    try {
        const user = await User.replaceExercisesInProgram(userId, programId, newExercises);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser, addProgram, removeProgram, addExercise, replaceExercisesInProgram };