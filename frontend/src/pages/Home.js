import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { user } = useAuthContext();
  const [exercises, setExercises] = useState([]);

  // Function to fetch exercises for the selected program
  const fetchExercises = useCallback(async () => {
    if (user.programs && user.user.selectedProgram) {
      const selectedProgram = user.programs.find((program) => program.name === user.user.selectedProgram);
      if (selectedProgram) {
        setExercises(selectedProgram.exercises);
      }
    }
    else {
      if (user && user.user.selectedProgram) {
      const selectedProgram = user.user.programs.find((program) => program.name === user.user.selectedProgram);
      if (selectedProgram) {
        setExercises(selectedProgram.exercises);
      }
    }}
  }, [user]);

  // Fetch exercises on component mount and whenever user or selectedProgram changes
  useEffect(() => {
    fetchExercises();
  }, [fetchExercises, user, user.user.selectedProgram]);

  return (
    <div className='home z-0 w-screen'>
      {exercises.map((exercise) => (
        <Card key={exercise._id} exercise={exercise} />
      ))}
    </div>
  );
};

export default Home;
