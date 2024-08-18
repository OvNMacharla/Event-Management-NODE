import React from "react";
import Header from "./Header/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <span className="md:hidden block">
                <Header />
            </span>

            <Outlet />
        </div>
    )
}

export default Layout;