import React from 'react';
import { FaDesktop, FaMoon, FaSun, FaUser } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { role } = useAuth();

    return (
        <header className="animate-enter" style={{
            padding: '1.2rem 2.5rem',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>SYSTEM LIVE</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button
                    onClick={toggleTheme}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
                        width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'var(--transition-smooth)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-main)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                >
                    {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                </button>

                <div style={{ 
                    padding: '0.5rem 1.2rem', 
                    borderRadius: '100px', 
                    background: 'var(--brand-primary-soft)',
                    border: '1px solid var(--brand-primary)',
                    display: 'flex', alignItems: 'center', gap: '10px'
                }}>
                    <FaUser size={14} style={{ color: 'var(--brand-primary)' }} />
                    <span style={{ 
                        color: 'var(--brand-primary)', 
                        fontWeight: 800, 
                        fontSize: '0.75rem', 
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {role === 'teacher' ? 'Faculty Portal' : 'Student Account'}
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
