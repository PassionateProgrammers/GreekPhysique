const ExerciseGroup = require('../models/exerciseModel');

// get all Exercises and groups
const getAllExercises = async (req, res) => {
  try {
    const exercises = await ExerciseGroup.find({}, 'name exercises');
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get exercise by specified group name
const getExercisesByGroup = async (req, res) => {
  const groupName = req.params.groupName;
  try {
    const exercises = await ExerciseGroup.findOne({ name: groupName }, 'name exercises');
    if (!exercises) {
      return res.status(404).json({ message: 'Exercises not found' });
    }
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllExercises,
  getExercisesByGroup
};
