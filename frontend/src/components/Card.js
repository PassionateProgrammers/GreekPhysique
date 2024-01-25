import React, { useState } from 'react';

const Card = ({ exercise }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  if (!exercise) {
    return (
      <div className='card'>
        <h1>{`Exercise not found`}</h1>
      </div>
    );
  }

  return (
    <div className='card'>
        <div className='card-tabs flex text-md'>
            <button
            className={`overview-tab flex-1 p-2 ${activeTab === 'Overview' ? 'active-tab' : ''}`}
            onClick={() => handleTabClick('Overview')}
            >
            Overview
            </button>
            <button
            className={`flex-1 p-2 ${activeTab === 'LogWorkout' ? 'active-tab' : ''}`}
            onClick={() => handleTabClick('LogWorkout')}
            >
            Log Workout
            </button>
            <button
            className={`instructions-tab flex-1 p-2 ${activeTab === 'Instructions' ? 'active-tab' : ''}`}
            onClick={() => handleTabClick('Instructions')}
            >
            Instructions
            </button>
        </div>
        <div className='card-exercise-title flex justify-center text-xl pt-6'>
            <h1>{exercise.name}</h1>
        </div>
    </div>
  );
};

export default Card;

