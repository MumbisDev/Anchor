import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ component: Component }) => {
    const user = useSelector(state => state.session.user);
    
    if (user) {
        return <Navigate to="/home" replace={true} />;
    }

    return <Component />;
};

export default PublicRoute;