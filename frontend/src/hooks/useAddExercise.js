import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useAddExercise = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);


  const addExerciseToProgram = async (userId, programId, exercise) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/user/${userId}/program/${programId}/add-exercise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exerciseToAdd: exercise }),
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error('Failed to add exercise to program');
      }

      const updatedUser = await response.json();

      console.log('Updated user:', updatedUser);

      // Update the local state with the response from the server (if needed)
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });

      // Clear any previous errors
      setError(null);
      
    } catch (error) {
      console.error('Error adding exercise to program:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    addExerciseToProgram,
    error,
    clearError,
    isLoading,
  };
};

export default useAddExercise;
