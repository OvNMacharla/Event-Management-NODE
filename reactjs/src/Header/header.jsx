import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const logoutButton = () => {
        localStorage.setItem('authToken', '');
        navigate('/')
    }

    return (
        <header className="">
            <div className="mx-auto flex justify-between items-center">
                <nav className="flex space-x-8">
                    {!token && (
                        <Link to="/" className="hover:underline">
                            Auth
                        </Link>
                    )}
                    <Link to="/events" className=" hover:underline">
                        Events
                    </Link>
                    <Link to="/bookings" className=" hover:underline">
                        Bookings
                    </Link>
                    {token && (
                        <button
                            onClick={logoutButton}
                            className=" hover:underline focus:outline-none"
                        >
                            Logout
                        </button>
                    )}
                </nav>
                <div className=" font-bold text-lg ml-auto">
                    MyApp
                </div>
            </div>
        </header >
    );
};

export default Header;
