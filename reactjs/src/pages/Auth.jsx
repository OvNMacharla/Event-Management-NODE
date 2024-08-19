import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { LOGIN } from '../QueryMutation/graphql-query';
import { CREATE } from '../QueryMutation/graphql-mutation';

function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [login] = useLazyQuery(LOGIN);
    const [create] = useMutation(CREATE);

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (email.trim().length === 0 || password.trim().length === 0) {
            setError('Please fill in both fields.');
            return;
        }
        try {
            if (isLogin) {
                const { data } = await login({ variables: { email, password } });
                console.log(data, "APOLLo")
                const { token, userId } = data.login;
                localStorage.setItem('authToken', token)
                localStorage.setItem('userId', userId)
                navigate('/events');
            }
            else {
                const { data } = await create({ variables: { email, password } });
                console.log('User created:', data);
            }
            setError('');
        } catch (error) {
            if (error.response) {
                const message = error.response.data.errors[0]?.message || 'An error occurred.';
                if (message.includes('User not found') || message.includes('Password incorrect')) {
                    setIsLogin(false);
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
        <div className="flex justify-center items-center h-screen">
            <form className="w-72 text-center">
                <h2 className="text-2xl font-semibold mb-4">{isLogin ? 'Login' : 'Create Account'}</h2>
                <div className="mb-2">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                </div>
                {error && (
                    <div className="text-red-500 mb-2">
                        {error}
                    </div>
                )}
                <button
                    onClick={handleSignIn}
                    className="w-full p-2 mb-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    {isLogin ? 'Login' : 'Create User'}
                </button>
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Switch to {isLogin ? 'Create Account' : 'Login'}
                </button>
            </form>
        </div>

    );
}

export default AuthPage;