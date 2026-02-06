import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../../context';

const ProtectedRoute = ({ children }) => {
    const [user] = useContext(Context);

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
