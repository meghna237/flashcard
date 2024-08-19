import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Use useHistory hook to navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username: username,
                password: password,
            });

            if (response.data.success) {
                history.push('/subjects'); // Redirect to the subjects page on successful login
            } else {
                alert('Login failed. Please check your username and password.');
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <br />
                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
