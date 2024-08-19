import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('authToken');

    return token ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
