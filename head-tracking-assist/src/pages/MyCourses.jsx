import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGlobe, FaJs, FaReact, FaPallet, FaPlayCircle, FaChevronRight } from 'react-icons/fa';

const MyCourses = () => {
    const navigate = useNavigate();
    const courses = [
        { id: 1, title: 'Web Accessibility 101', progress: 75, icon: <FaGlobe />, color: '#6366f1' },
        { id: 2, title: 'JavaScript Essentials', progress: 40, icon: <FaJs />, color: '#f59e0b' },
        { id: 3, title: 'React for Everyone', progress: 10, icon: <FaReact />, color: '#0ea5e9' },
        { id: 4, title: 'UI Design Principles', progress: 0, icon: <FaPallet />, color: '#ec4899' },
    ];

    return (
        <div className="page-container animate-enter" style={{ padding: '3rem 4rem' }}>
            <div className="flex-between" style={{ marginBottom: '4rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--brand-secondary)' }}>My Library</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: 600 }}>Pick up exactly where you left off.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ padding: '0.8rem 1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid var(--border-subtle)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        All Categories
                    </div>
                </div>
            </div>

            <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                {courses.map((course, idx) => (
                    <div 
                        key={course.id} 
                        className="card-panel" 
                        style={{ 
                            cursor: 'pointer', padding: '0', display: 'flex', flexDirection: 'column',
                            animationDelay: `${idx * 0.1}s`
                        }} 
                        onClick={() => navigate('/notes')}
                    >
                        {/* Course Banner */}
                        <div style={{ 
                            height: '200px', background: course.color, position: 'relative', overflow: 'hidden',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', color: 'white'
                        }}>
                            {course.icon}
                            {/* Decorative Mesh Overlay */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.2))' }} />
                        </div>

                        {/* Course Content */}
                        <div style={{ padding: '2rem' }}>
                            <div className="flex-between" style={{ marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Module {course.id}</span>
                                <div style={{ background: 'var(--bg-main)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800 }}>8 Lessons</div>
                            </div>
                            
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--brand-secondary)' }}>{course.title}</h3>
                            
                            {/* Progress Section */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div className="flex-between" style={{ marginBottom: '0.6rem', fontSize: '0.9rem', fontWeight: 800 }}>
                                    <span>{course.progress}% Complete</span>
                                    <span style={{ color: 'var(--text-muted)' }}>{course.progress > 0 ? 'Syncing...' : 'Not Started'}</span>
                                </div>
                                <div style={{ height: '8px', background: 'var(--bg-main)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ width: `${course.progress}%`, background: 'var(--brand-gradient)', height: '100%', borderRadius: '10px', transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
                                </div>
                            </div>

                            <button className="btn-primary" style={{ width: '100%', justifyContent: 'space-between', padding: '1.2rem 1.8rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FaPlayCircle size={18} /> {course.progress > 0 ? 'Resume Lesson' : 'Start Learning'}</span>
                                <FaChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCourses;
