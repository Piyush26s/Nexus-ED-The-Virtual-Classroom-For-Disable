import React from 'react';
import { FaBook, FaRobot, FaCheckCircle, FaUniversalAccess, FaBrain, FaEye } from 'react-icons/fa';
import { useHeadTrackingContext } from '../context/HeadTrackingContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { role } = useAuth();
    const { trackingData } = useHeadTrackingContext();
    const navigate = useNavigate();

    const stats = [
        { title: 'Courses Enrolled', value: '4', icon: <FaBook />, color: 'blue' },
        { title: 'Completed Lessons', value: '12', icon: <FaCheckCircle />, color: 'green' },
        { title: 'AI Queries', value: '86', icon: <FaRobot />, color: 'purple' },
        { title: 'Attention Score', value: `${trackingData?.attentionScore || 0}%`, icon: <FaBrain />, color: 'orange' },
    ];

    return (
        <div className="page-container animate-enter">
            {/* Header Section */}
            <div className="flex-between" style={{ marginBottom: '3rem', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--brand-secondary)' }}>
                        Welcome back, Piyush
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        You're doing great! Keep up the momentum.
                    </p>
                </div>
                <div className="card-panel" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--brand-secondary)', color: 'white' }}>
                    <div style={{ 
                        width: '10px', height: '10px', borderRadius: '50%', 
                        background: trackingData?.isTracking ? 'var(--success)' : 'var(--danger)',
                        boxShadow: trackingData?.isTracking ? '0 0 10px var(--success)' : 'none'
                    }} />
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                        {trackingData?.isTracking ? "AI PROTECTED" : "TRACKING PAUSED"}
                    </span>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div key={stat.title} className="card-panel stat-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className={`stat-icon icon-${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <p>{stat.title}</p>
                            <h3>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Grid Content */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)', gap: '2.5rem', marginTop: '3rem' }}>
                
                {/* Learning Progress Section */}
                <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="flex-between">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Continue Learning</h2>
                        <button className="text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>View All Courses</button>
                    </div>

                    <div style={{ 
                        display: 'flex', gap: '2rem', padding: '1.5rem', background: 'var(--bg-main)', 
                        borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
                        alignItems: 'center'
                    }}>
                        <div style={{ 
                            width: '180px', height: '120px', 
                            background: 'linear-gradient(135deg, var(--brand-primary), #4f46e5)', 
                            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontSize: '2.5rem', shadow: 'var(--shadow-premium)'
                        }}>
                            <FaBook />
                        </div>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Next Module</span>
                            <h3 style={{ fontSize: '1.4rem', margin: '0.4rem 0', fontWeight: 800 }}>Inclusive UX Design</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Lesson 4: Eye-Tracking Principles</p>
                            
                            <div style={{ marginTop: '1.5rem' }}>
                                <div className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                    <span style={{ fontWeight: 700 }}>65% Complete</span>
                                    <span style={{ color: 'var(--text-muted)' }}>45m left</span>
                                </div>
                                <div style={{ height: '6px', background: 'var(--border-medium)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: '65%', background: 'var(--brand-primary)' }}></div>
                                </div>
                            </div>
                        </div>
                        <button className="btn-primary" onClick={() => navigate('/courses')}>Resume</button>
                    </div>
                </div>

                {/* AI Accessibility HUD */}
                <div className="card-panel" style={{ background: 'var(--brand-secondary)', color: 'white', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="flex-between">
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white' }}>Assistive AI</h2>
                        <FaUniversalAccess size={24} style={{ color: 'var(--brand-primary)' }} />
                    </div>

                    <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Live Detection:</p>
                        <h4 style={{ fontSize: '1.2rem', color: 'white', fontWeight: 700 }}>{trackingData?.headStatus || "Neutral"}</h4>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { label: 'Voice Link', status: 'Active', color: 'var(--success)' },
                            { label: 'Eye Focus', status: 'Tracking', color: 'var(--brand-primary)' },
                            { label: 'Auto-Read', status: 'Standby', color: 'var(--text-muted)' }
                        ].map(item => (
                            <div key={item.label} className="flex-between" style={{ fontSize: '0.9rem' }}>
                                <span style={{ opacity: 0.8 }}>{item.label}</span>
                                <span style={{ fontWeight: 800, color: item.color, fontSize: '0.8rem' }}>{item.status.toUpperCase()}</span>
                            </div>
                        ))}
                    </div>

                    <button 
                        className="btn-primary w-full" 
                        onClick={() => navigate('/progress')}
                        style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', marginTop: 'auto' }}
                    >
                        Detailed Analytics
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
