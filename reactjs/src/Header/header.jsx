import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../context/auth-context";

const Header = () => {
    const { token } = useContext(AuthContext);
    return (
        <div className="w-fit font-semibold bg-nav-background rounded-tr-lg rounded-bl-2xl pt-3 pb-3 pl-9 pr-9 md:flex hidden gap-9">
            {!token && <Link to="/" className="hover:underline">
                Auth
            </Link>}
            <Link to="/events" className="hover:underline">
                Events
            </Link>
            <Link to="/bookings" className="hover:underline">
                Bookings
            </Link>
        </div>
    )
}

export default Header;