import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState, useEffect } from 'react';
import DarkMode from './DarkMode';

const Navbar = () => {
  const { logout } = useLogout();
  const { user, dispatch } = useAuthContext();

  // Add local state to track whether user data has been loaded
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(parsedUser);
    }

    setUserDataLoaded(true);

    const selectedTheme = localStorage.getItem('selectedTheme');
    document.querySelector('body').setAttribute('data-theme', selectedTheme || 'light');
  }, [dispatch]);

  if (!userDataLoaded) {
    return null;
  }

  return (
    <header>
      {user && (
        <div className='navcontainer'>
            <div className='w-1/2'>
                <div className='leftitems text-2xl'>
                    <h1>Welcome, {user.user.firstname}</h1>
                </div>
            </div>
            <div className='w-1/2'>
                <div className='rightitems'>
                    <nav className='mr-6'>
                        <button onClick={handleClick}>Log out</button>
                    </nav>
                    <DarkMode />
                </div>
            </div>
        </div>
      )}
      {!user && (
        <div className='navcontainer'>
            <div className='w-1/3'>
                <div className='leftitems text-3xl'>
                    <Link to="/">
                    <h1>Greek Physique</h1>
                    </Link>
                </div>
            </div>
            <div className='w-1/3'>
                <h3 className='subtitle text-xl'>Workout Planner</h3>
            </div>
            <div className='w-1/3'>
                <div className='rightitems'> 
                    <nav className='mr-6'>
                        <Link to="/login">Login</Link>
                    </nav>
                    <nav className='mr-6'>
                        <Link to="/signup">Signup</Link>
                    </nav>
                <DarkMode />
                </div>
            </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
