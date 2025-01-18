import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

function Layout() {
    return (
        <div className="layout">
            <Navigation />
            <Outlet />
        </div>
    );
}

export default Layout;