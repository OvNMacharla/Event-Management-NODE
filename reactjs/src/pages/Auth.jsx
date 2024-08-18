import React, { useState } from 'react';
import axios from 'axios';

function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0) {
            setError('Please fill in both fields.');
            return;
        }

        const reqBody = {
            query: `
            mutation {
                createUser(userInput: { email: "${email}", password: "${password}" }) {
                    _id
                    email
                }
            }`
        };

        const userReqBody = {
            query: `
            query {
                login(email: "${email}", password: "${password}") {
                    userId
                    token
                }
            }`
        };

        try {
            const response = await axios.post('http://localhost:8000/graphql', JSON.stringify(isLogin ? userReqBody : reqBody), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (isLogin) {
                // Handle successful login
                console.log('Login successful:', response.data);
                // Store token or handle redirection here
            } else {
                // Handle successful user creation
                console.log('User created:', response.data);
                // Handle post user creation (e.g., redirect, show message, etc.)
            }

            // Clear any existing error
            setError('');

        } catch (error) {
            if (error.response) {
                const message = error.response.data.errors[0]?.message || 'An error occurred.';
                if (message.includes('User not found') || message.includes('Password incorrect')) {
                    setIsLogin(false); // Switch to create user mode
                    setError(message + ' Switching to user creation.');
                } else {
                    setError(message);
                }
            } else {
                setError('Network error. Please try again.');
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form style={{ width: '300px', textAlign: 'center' }}>
                <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px' }}
                    />
                </div>
                {error && (
                    <div style={{ color: 'red', marginBottom: '10px' }}>
                        {error}
                    </div>
                )}
                <button
                    onClick={handleSignIn}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        marginBottom: '10px',
                    }}
                >
                    {isLogin ? 'Login' : 'Create User'}
                </button>
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                    }}
                >
                    Switch to {isLogin ? 'Create Account' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default AuthPage;