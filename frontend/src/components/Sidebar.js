import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../hooks/useAuthContext';
import useAddExercise from '../hooks/useAddExercise';

const Sidebar = ({ showSidebar }) => {
  const { user } = useAuthContext();
  const [exerciseData, setExerciseData] = useState([]);
  const [groupVisibility, setGroupVisibility] = useState({});
  const { addExerciseToProgram, error, clearError } = useAddExercise();

  useEffect(() => {
    // Fetch exercise data when the sidebar becomes visible
    const fetchData = async () => {
      try {
        const response = await fetch('/api/exercises');
        const data = await response.json();
        setExerciseData(data);
        initializeGroupVisibility(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchData();
  }, []);

  const initializeGroupVisibility = (data) => {
    const visibilityObj = {};
    data.forEach((group) => {
      visibilityObj[group.name] = false;
    });
    setGroupVisibility(visibilityObj);
  };

  const toggleExercisesByGroup = (groupName) => {
    setGroupVisibility((prevVisibility) => ({
      ...prevVisibility,
      [groupName]: !prevVisibility[groupName],
    }));
  };

  const handleAddExercise = async (selectedProgram, exercise) => {
    try {
      const storedUser = user.user;
      const userId = storedUser._id;
      const selectedProgramObject = user.user.programs.find((program) => program.name === selectedProgram);

      if (selectedProgramObject) {
        const programId = selectedProgramObject._id;
        await addExerciseToProgram(userId, programId, exercise);

        // Clear any previous errors
        clearError();
      } else {
        console.error('Selected program not found');
      }
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  return (
    <div className={`sidebar z-40 top-26 left-0 h-screen w-1/5 transition-transform transform absolute ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="ml-4 my-2">
        {Array.isArray(exerciseData) &&
          exerciseData.map((group) => (
            <div key={group._id} className="mb-4">
              <div
                onClick={() => toggleExercisesByGroup(group.name)}
                className="flex items-center hover:cursor-pointer text-primary font-semibold"
              >
                <span className="mr-2">{groupVisibility[group.name] ? '▼' : '►'}</span>
                <span>{group.name}</span>
              </div>
              {groupVisibility[group.name] &&
                group.exercises.map((exercise) => (
                  <div key={exercise._id} className="exercises ml-6 flex items-center">
                    {exercise.name}
                    <button
                      className='py-2 ml-auto mr-6 secondary-btn'
                      onClick={() => handleAddExercise(user.user.selectedProgram, exercise)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
