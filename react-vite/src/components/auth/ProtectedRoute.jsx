// This component restricts access to routes based on user authentication status.
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const user = useSelector(state => state.session.user);
    
    if (!user) {
        return <Navigate to="/" replace={true} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;