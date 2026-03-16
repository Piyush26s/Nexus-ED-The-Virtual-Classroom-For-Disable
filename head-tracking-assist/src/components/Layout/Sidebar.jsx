import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaThLarge, FaBook, FaRobot, FaUniversalAccess,
    FaChartLine, FaCog, FaSignOutAlt, FaUserGraduate
} from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const { role, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const allNavItems = [
        { name: 'Dashboard', icon: <FaThLarge />, path: '/dashboard' },
        { name: 'My Courses', icon: <FaBook />, path: '/courses', roles: ['student'] },
        { name: 'AI Assistant', icon: <FaRobot />, path: '/ai-assistant', roles: ['student'] },
        { name: 'Accessibility', icon: <FaUniversalAccess />, path: '/accessibility' },
        { name: 'Progress', icon: <FaChartLine />, path: '/progress', roles: ['student'] },
        { name: 'Teacher Portal', icon: <FaUserGraduate />, path: '/teacher', roles: ['teacher'] },
        { name: 'Settings', icon: <FaCog />, path: '/settings' },
    ];

    const navItems = allNavItems.filter(item => !item.roles || item.roles.includes(role));

    return (
        <aside className="sidebar animate-enter">
            <div className="sidebar-header" style={{ marginBottom: '4rem' }}>
                <div className="logo-icon" style={{ borderRadius: '14px', width: '45px', height: '45px' }}>V</div>
                <h2 className="logo-text" style={{ fontSize: '1.6rem', color: 'var(--brand-secondary)' }}>VirtClass</h2>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        style={({ isActive }) => ({
                            padding: '1rem 1.4rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            borderRadius: '16px',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            transition: 'var(--transition-smooth)',
                            color: isActive ? 'white' : 'var(--text-secondary)',
                            background: isActive ? 'var(--brand-primary)' : 'transparent',
                            boxShadow: isActive ? '0 8px 16px rgba(99, 102, 241, 0.3)' : 'none'
                        })}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem' }}>
                <button 
                    onClick={handleLogout} 
                    className="logout-btn"
                    style={{
                        padding: '1rem 1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%',
                        borderRadius: '16px',
                        background: 'rgba(239, 68, 68, 0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.1)',
                        color: 'var(--danger)',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.1)';
                    }}
                >
                    <FaSignOutAlt style={{ fontSize: '1.1rem' }} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
