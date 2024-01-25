const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const ExerciseSchema = new mongoose.Schema({
    name: String,
    muscles_worked: [String],
  });

const programSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exercises: [ExerciseSchema]
});

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rank: {
        type: Number
    },
    scores: {
        bench_press_score: { type: Number },
        incline_bench_press_score: { type: Number },
        decline_bench_press_score: { type: Number },
        DB_fly_score: { type: Number },
        DB_bench_press_score: { type: Number },
        DB_incline_bench_press_score: { type: Number },
        DB_decline_bench_press_score: { type: Number },
        overhead_press_score: { type: Number },
        lateral_raise_score: { type: Number },
        upright_row_score: { type: Number },
        rear_delt_fly_score: { type: Number },
        skull_crusher_score: { type: Number },
        EZ_bar_curl_score: { type: Number },
        DB_curl_score: { type: Number },
        tricep_extension_score: { type: Number },
        tricep_push_down_score: { type: Number },
        squat_score: { type: Number },
        deadlift_score: { type: Number },
        bent_over_row_score: { type: Number },
        pullup_score: { type: Number },
        pushup_score: { type: Number },
        leg_curl_score: { type: Number },
        leg_extension_score: { type: Number },
        calf_raise_score: { type: Number },
        wrist_curl_score: { type: Number },
        hammer_curl_score: { type: Number },
        romanian_deadlift_score: { type: Number },
        split_squat_score: { type: Number },
        hip_thrust_score: { type: Number },
        DB_lunge_score: { type: Number },
        plank_score: { type: Number },
        situp_score: { type: Number },
        russian_twist_score: { type: Number },
        v_sit_score: { type: Number }
    },
    programs: [programSchema]
})

//static signup method
userSchema.statics.signup = async function(firstname, lastname, email, password) {

    //validation
    if (!firstname || !lastname || !email || !password) {
        throw Error('All Fields Required')
    }

    if (!validator.isEmail(email)) {
        throw Error('Please enter a valid email address')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password must be a minimum of 8 characters and include at least one of each: uppercase, lowercase, number, symbol')
    }

    const normalizedEmail = email.toLowerCase()
    
    const exists = await this.findOne({ email: normalizedEmail })

    if(exists) {
        throw Error(('Email already in use'))
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        firstname,
        lastname,
        email: normalizedEmail,
        password: hash,
        rank: 0,
        programs: [{
            name: 'Program 0',
            exercises: []  // You can initialize it with an empty array or with default exercises if needed
        }]
    });
    
    user.scores = Object.fromEntries(Object.keys(user.scores).map(key => [key, 0]))
    await user.save()

    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    
    if (!email || !password) {
        throw Error('All Fields Required')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error(('Invalid email'))
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Invalid password')
    }
    return user
}

userSchema.statics.addProgram = async function(userId, programData) {
    try {
      // Find the user by ID
      const user = await this.findById(userId);
      
      if (!user) {
        throw new Error('User not found');
      }
  
      // Create a new program using the provided data
      const newProgram = {
        name: programData.name,
        exercises: programData.exercises,
      };
  
      // Add the new program to the user's programs array
      user.programs.push(newProgram);
  
      // Save the user document with the updated programs array
      await user.save();
      
      return user;
    } catch (error) {
      throw new Error('Failed to add program: ' + error.message);
    }
}

userSchema.statics.removeProgram = async function(userId, programId) {
    try {
      // Find the user by ID
      const user = await this.findById(userId);
      
      if (!user) {
        throw new Error('User not found');
      }
  
      // Find the index of the program to remove in the programs array
      const programIndex = user.programs.findIndex(program => program._id.equals(programId));
  
      if (programIndex === -1) {
        throw new Error('Program not found');
      }
  
      // Remove the program from the programs array
      user.programs.splice(programIndex, 1);
  
      // Save the user document with the updated programs array
      await user.save();
      
      return user;
    } catch (error) {
      throw new Error('Failed to remove program: ' + error.message);
    }
}

userSchema.statics.addExerciseToProgram = async function(userId, programId, exerciseToAdd) {
    try {
      // Find the user by ID
      const user = await this.findById(userId);
      
      if (!user) {
        throw new Error('User not found');
      }
  
      // Find the program by ID within the user's programs array
      const program = user.programs.find(program => program._id.equals(programId));
  
      if (!program) {
        throw new Error('Program not found');
      }
  
      // Add the exercise to the program's exercises array
      program.exercises.push(exerciseToAdd);
  
      // Save the user document with the updated programs array
      await user.save();
      
      return user;
    } catch (error) {
      throw new Error('Failed to add exercise to program: ' + error.message);
    }
  }

module.exports = mongoose.model('User', userSchema)