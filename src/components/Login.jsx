import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('', {
                username: username,
                password: password,
            });
            if (response.data.success) {
                alert('Login successful!');
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
                /><br />
                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
