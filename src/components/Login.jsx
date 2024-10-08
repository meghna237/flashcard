import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';
import { UserContext } from '../context/UserContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUserID } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/login', {
                username,
                password,
            });
            console.log(response.data.userID);
            if (response.data.success) {
                setUserID(response.data.userID);
                navigate('/subjects'); // Redirect to the subjects page on successful login
            } else {
                alert('Login failed. Please check your username and password.');
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signup'); // Redirect to the sign-up page
    };

    return (
        <div id="login">
            <h1>Sign In to Flashcards</h1>
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
            </form><br />
            <p>Do not have an account? Sign Up below</p><br></br>
            <button onClick={handleSignUpRedirect}>Sign Up</button>
        </div>
    );
}

export default Login;
