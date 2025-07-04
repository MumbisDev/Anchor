// Import dependencies
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// This component restricts access to routes based on user authentication status.
const ProtectedRoute = () => {
    const user = useSelector(state => state.session.user);
    
    if (!user) {
        return <Navigate to="/" replace={true} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;