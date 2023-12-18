import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div>
            {user && (
                <div className="container">
                <h1>Welcome, {user.firstname}</h1>
                <nav>
                    <button onClick={handleClick}>Log out</button> 
                </nav>
                </div>
                )}
            {!user && (
                <div className="container">
                    <Link to="/">
                    <h1>Greek Physique</h1>
                    </Link>
                    <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                    </nav>
                </div>
                )}
            </div>
        </header>
    )
}

export default Navbar