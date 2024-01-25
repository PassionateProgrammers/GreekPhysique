import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSelectProgram } from '../hooks/useSelectProgram';

const Toolbar = ({ showSidebar, onToggleSidebar }) => {
    const { user, dispatch } = useAuthContext();
    const { selectProgram } = useSelectProgram();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          dispatch({ type: 'LOGIN', payload: parsedUser });
        }
      }, [dispatch]);
    
    useEffect(() => {
    console.log('SelectedProgram:', user?.user?.selectedProgram);
    }, [user?.user?.selectedProgram]);

    const handleCreateProgram = () => {
    // Implement logic to create a new program
    console.log('Creating a new program...');
    };

    const handleDeleteProgram = () => {
        // Implement logic to delete the selected program
    };

    const handleProgramChange = (e) => {
        selectProgram(e.target.value);
    };

    if (!user || !user.user.programs || user.user.programs.length === 0) {
        console.log('No programs available');
        return null; // Render nothing if user or user.programs is not available or empty
    }

    return (
        <div className='toolbar flex text-lg'>
            <button onClick={onToggleSidebar} className={`toolbar-btn justify-center w-1/5 ${showSidebar ? 'primary-btn' : 'secondary-btn'}`}>
                <span className='py-2 font-semibold'>Exercises</span>
            </button>
            <div className='py-2 flex w-1/3 justify-center ml-64 mr-6'>
            <select
            value={user?.user?.selectedProgram || (user.user.programs.length > 0 ? user.user.programs[0].name : '')}
            onChange={handleProgramChange}
            className='toolbar-select w-full'
        >
            {user.user.programs && user.user.programs.map((program) => (
                <option key={program._id} value={program.name}>
                    {program.name}
                </option>
            ))}
            </select>
            </div>
            <button onClick={handleCreateProgram} className='toolbar-btn mr-4 py-2'>
            <FontAwesomeIcon icon={faPlus} />
            </button>
            <button onClick={handleDeleteProgram} className='toolbar-btn mr-4 py-2' disabled={!user.selectedProgram}>
            <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
  );
};

export default Toolbar;
