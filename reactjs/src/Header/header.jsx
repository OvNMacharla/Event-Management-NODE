import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="w-fit font-semibold bg-nav-background rounded-tr-lg rounded-bl-2xl pt-3 pb-3 pl-9 pr-9 md:flex hidden gap-9">
            <Link to="/auth" className="hover:underline">
                Auth
            </Link>
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