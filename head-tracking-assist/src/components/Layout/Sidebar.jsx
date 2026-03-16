import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaThLarge, FaBook, FaRobot, FaUniversalAccess,
    FaChartLine, FaCog, FaSignOutAlt, FaUserGraduate
} from 'react-icons/fa';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: <FaThLarge />, path: '/dashboard' },
        { name: 'My Courses', icon: <FaBook />, path: '/courses' },
        { name: 'AI Assistant', icon: <FaRobot />, path: '/ai-assistant' },
        { name: 'Accessibility', icon: <FaUniversalAccess />, path: '/accessibility' },
        { name: 'Progress', icon: <FaChartLine />, path: '/progress' },
        { name: 'Teacher Portal', icon: <FaUserGraduate />, path: '/teacher' },
        { name: 'Settings', icon: <FaCog />, path: '/settings' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">V</div>
                <h2 className="logo-text">VirtClass</h2>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-text">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="logout-btn">
                    <FaSignOutAlt className="nav-icon" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
