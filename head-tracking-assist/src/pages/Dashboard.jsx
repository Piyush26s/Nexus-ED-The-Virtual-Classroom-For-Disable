import React from 'react';
import { 
    FaPlus, FaEdit, FaCalendarAlt, FaTv, FaRobot, 
    FaBookOpen, FaUserFriends, FaClock, FaCheckCircle,
    FaRegBell, FaChevronRight 
} from 'react-icons/fa';
import { useHeadTrackingContext } from '../context/HeadTrackingContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const { trackingData } = useHeadTrackingContext();
    const navigate = useNavigate();

    const quickActions = [
        { title: 'Enter Classroom', icon: <FaPlus />, color: 'var(--brand-primary)', path: '/courses' },
        { title: 'AI Assistant', icon: <FaRobot />, color: 'var(--brand-primary)', path: '/ai-assistant' },
        { title: 'Schedule', icon: <FaCalendarAlt />, color: 'var(--brand-primary)', path: '/settings' },
        { title: 'My Progress', icon: <FaTv />, color: 'var(--brand-primary)', path: '/settings' },
    ];

    const upcomingSessions = [
        { time: '14:00', title: 'Mathematics Grade 10', instructor: 'Dr. Smith', type: 'Live' },
        { time: '16:30', title: 'English Literature', instructor: 'Mrs. Jones', type: 'Group' }
    ];

    return (
        <div className="page-container animate-enter" style={{ background: '#f6f7f9', minHeight: '100vh', padding: '0' }}>
            
            {/* Top Minimal Header (Zoom Style) */}
            <div style={{ 
                height: '60px', background: 'white', borderBottom: '1px solid #e1e4e8', 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 3rem', position: 'sticky', top: 0, zIndex: 100
            }}>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 600, color: '#4a4a4a' }}>
                   <span style={{ color: 'var(--brand-primary)', borderBottom: '3px solid var(--brand-primary)', padding: '18px 0' }}>Home</span>
                   <span style={{ padding: '18px 0', cursor: 'pointer' }} onClick={() => navigate('/courses')}>Courses</span>
                   <span style={{ padding: '18px 0', cursor: 'pointer' }} onClick={() => navigate('/teacher')}>Teacher Portal</span>
                   <span style={{ padding: '18px 0', cursor: 'pointer' }}>Team Chat</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <FaRegBell style={{ fontSize: '1.2rem', color: '#666', cursor: 'pointer' }} />
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--brand-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {user?.name?.[0] || 'U'}
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '4rem' }}>
                
                {/* Left Side: Big Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                    {quickActions.map((action, idx) => (
                        <div key={action.title} 
                            onClick={() => navigate(action.path)}
                            style={{ 
                                background: 'white', borderRadius: '32px', padding: '3rem 2rem', 
                                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                                cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                                border: '1px solid #f0f0f0'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)';
                            }}
                        >
                            <div style={{ 
                                width: '80px', height: '80px', borderRadius: '24px', 
                                background: idx === 0 ? '#ff742e' : 'var(--brand-primary)', 
                                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem', marginBottom: '1.5rem', boxShadow: idx === 0 ? '0 10px 20px rgba(255, 116, 46, 0.3)' : '0 10px 20px rgba(99, 102, 241, 0.3)'
                            }}>
                                {action.icon}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a' }}>{action.title}</h3>
                        </div>
                    ))}
                    
                    {/* Active Attention HUD Card (Minimal Zoom Style) */}
                    <div className="card-panel" style={{ gridColumn: 'span 2', background: 'white', display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '4px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
                                {trackingData?.attentionScore || 0}%
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '15px', height: '15px', borderRadius: '50%', background: trackingData?.isTracking ? 'var(--success)' : 'var(--danger)', border: '3px solid white' }} />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontWeight: 800 }}>AI Attention Monitor</h4>
                            <p style={{ margin: '4px 0 0', color: '#666', fontSize: '0.9rem' }}>
                                {trackingData?.isTracking ? "Real-time tracking active. You are doing well!" : "Connect camera to start tracking."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Schedule & Details */}
                <div>
                   <div style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0', marginBottom: '2rem' }}>
                        <div className="flex-between" style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontWeight: 800 }}>Upcoming Classes</h3>
                            <FaCalendarAlt style={{ color: '#ccc' }} />
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {upcomingSessions.map((session, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'center', width: '60px' }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-primary)' }}>{session.time}</div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#999', textTransform: 'uppercase' }}>Today</div>
                                    </div>
                                    <div style={{ flex: 1, borderLeft: '3px solid #f0f0f0', paddingLeft: '1.5rem' }}>
                                        <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>{session.title}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>ID: 864-213-442 • {session.instructor}</div>
                                    </div>
                                    <button style={{ background: '#f0f4ff', color: 'var(--brand-primary)', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>Start</button>
                                </div>
                            ))}
                        </div>
                   </div>

                   {/* Current Course Quick Link */}
                   <div className="card-panel" style={{ background: 'var(--brand-gradient)', color: 'white', border: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <FaBookOpen />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.8 }}>CONTINUE LEARNING</span>
                        </div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Inclusive UX Design</h3>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px 18px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FaClock /> <span style={{ fontWeight: 700 }}>Lesson 4</span>
                            </div>
                            <FaChevronRight />
                        </div>
                   </div>
                </div>

            </div>

            <style>{`
                @media (max-width: 992px) {
                    .page-container > div {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default Dashboard;
