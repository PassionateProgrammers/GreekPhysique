import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const normalizedEmail = email.toLowerCase()
        
        await signup(firstname, lastname, normalizedEmail, password)
    }
    
    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>First Name:</label>
            <input
            type="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            />
            <label>Last Name:</label>
            <input
            type="lastname"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            />
            <label>Email:</label>
            <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <label>Password:</label>
            <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup