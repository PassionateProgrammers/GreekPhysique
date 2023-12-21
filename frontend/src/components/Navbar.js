import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useContext } from 'react'
import DarkMode from './DarkMode'


const Navbar = () => {
    const { logout } = useLogout()
    const { user, dispatch } = useAuthContext()
    
    const handleClick = () => {
        logout()
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            dispatch(parsedUser);
        }
    }, [dispatch]);

    return (
        <header>
            <div className='headerbar'>
            {user && (
                <div className="navcontainer">
                    <div className='leftitems'>
                        <h1>Welcome, {user.firstname}</h1>
                    </div>
                <nav className='rightitems'>
                    <button onClick={handleClick}>Log out</button>
                    <DarkMode /> 
                </nav>
                </div>
                )}
            {!user && (
                <div className="navcontainer">
                    <div className='leftitems'>
                    <Link to="/">
                    <h1>Greek Physique</h1>
                    </Link>
                    <h3 className='subtitle'>Workout Planner</h3>
                    </div>
                    <nav className='rightitems'>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                    <DarkMode />
                    </nav>
                </div>
                )}
            </div>
        </header>
    )
}

export default Navbar