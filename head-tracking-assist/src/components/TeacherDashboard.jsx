import React, { useState } from 'react';
import { 
    FaUserGraduate, FaChalkboardTeacher, FaClipboardCheck, FaPlus, 
    FaChartBar, FaCalendarAlt, FaBullhorn, FaCircle, FaUserCircle,
    FaArrowUp, FaArrowDown, FaSearch, FaHistory, FaTv, FaFileDownload, FaClock, FaChevronDown, FaLayerGroup
} from 'react-icons/fa';

const TeacherDashboard = () => {
    const [view, setView] = useState('live'); // live, reports
    const [filter, setFilter] = useState('all'); // all, low, high
    const [searchTerm, setSearchTerm] = useState('');
    
    // Multi-Class/Subject State
    const myClasses = [
        { id: 'C1', name: 'Computer Science', section: 'Grade 12-A', totalStudents: 45 },
        { id: 'C2', name: 'Data Structures', section: 'B.Tech - 2nd Year', totalStudents: 32 },
        { id: 'C3', name: 'Python Basics', section: 'Grade 10-C', totalStudents: 50 },
        { id: 'C4', name: 'UI/UX Design', section: 'Degree - Final Year', totalStudents: 28 },
    ];
    const [selectedClass, setSelectedClass] = useState(myClasses[0]);
    const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);

    const stats = [
        { title: 'Active Students', value: selectedClass.totalStudents, icon: <FaUserGraduate />, color: 'blue' },
        { title: 'Avg. Attention', value: '78%', icon: <FaChartBar />, color: 'green' },
        { title: 'Course Progress', value: '62%', icon: <FaLayerGroup />, color: 'purple' },
    ];

    const liveStudentData = [
        { id: 1, name: 'Aarav Sharma', score: 85, status: 'online', time: 'Active' },
        { id: 2, name: 'Isha Gupta', score: 92, status: 'online', time: 'Active' },
        { id: 3, name: 'Rohan Mehra', score: 42, status: 'online', time: 'Distracted' },
        { id: 4, name: 'Sanya Malhotra', score: 38, status: 'offline', time: 'Away' },
        { id: 5, name: 'Vikram Singh', score: 75, status: 'online', time: 'Active' },
        { id: 6, name: 'Priya Verma', score: 48, status: 'online', time: 'Losing Focus' },
        { id: 7, name: 'Ananya Panday', score: 96, status: 'online', time: 'Highly Active' },
        { id: 8, name: 'Kabir Khan', score: 25, status: 'online', time: 'Inactive' },
        { id: 9, name: 'Zoya Akhtar', score: 62, status: 'online', time: 'Active' },
        { id: 10, name: 'Dev Anand', score: 45, status: 'online', time: 'Distracted' },
    ];

    const pastSessions = [
        { id: 'S1', title: 'Session: Introduction', class: 'CS 12-A', date: 'Today, 10:00 AM', duration: '45m', avgAttention: 82, attendance: 42 },
        { id: 'S2', title: 'Session: Loops & Arrays', class: 'DS 2nd Yr', date: 'Yesterday', duration: '1h 10m', avgAttention: 68, attendance: 38 },
        { id: 'S3', title: 'Session: Variables', class: 'Python 10-C', date: 'Mar 24, 2026', duration: '50m', avgAttention: 75, attendance: 45 },
    ];

    const filteredStudents = liveStudentData.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        if (filter === 'low') return matchesSearch && student.score < 50;
        if (filter === 'high') return matchesSearch && student.score >= 50;
        return matchesSearch;
    });

    const lowAttentionCount = liveStudentData.filter(s => s.score < 50).length;
    const highAttentionCount = liveStudentData.filter(s => s.score >= 50).length;

    return (
        <div className="page-container animate-enter" style={{ padding: '2rem' }}>
            {/* Class Selector Header */}
            <div className="class-selector-bar" style={{ 
                display: 'flex', alignItems: 'center', gap: '1rem', 
                marginBottom: '2rem', background: '#f8fafc', padding: '0.8rem 1.5rem',
                borderRadius: '16px', border: '1px solid var(--border-medium)',
                position: 'relative'
            }}>
                <div style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-soft)', padding: '10px', borderRadius: '12px' }}>
                    <FaChalkboardTeacher size={20} />
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>CURRENT ACTIVE CLASS:</p>
                    <div 
                        onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', position: 'relative' }}
                    >
                        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{selectedClass.name} - <span style={{ color: 'var(--brand-primary)' }}>{selectedClass.section}</span></h3>
                        <FaChevronDown size={12} color="var(--text-muted)" />
                    </div>

                    {isClassDropdownOpen && (
                        <div style={{ 
                            position: 'absolute', top: '100%', left: '50px', background: 'white', 
                            boxShadow: '0 15px 40px rgba(0,0,0,0.1)', borderRadius: '16px', 
                            padding: '1rem', width: '300px', zIndex: 100, border: '1px solid var(--border-medium)',
                            marginTop: '10px'
                        }}>
                            {myClasses.map(cls => (
                                <div 
                                    key={cls.id}
                                    onClick={() => { setSelectedClass(cls); setIsClassDropdownOpen(false); }}
                                    style={{ 
                                        padding: '1rem', borderRadius: '12px', cursor: 'pointer',
                                        background: selectedClass.id === cls.id ? 'var(--bg-main)' : 'transparent',
                                        transition: 'var(--transition-smooth)'
                                    }}
                                    className="class-option"
                                >
                                    <p style={{ margin: 0, fontWeight: 800, fontSize: '1rem' }}>{cls.name}</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cls.section} • {cls.totalStudents} Students</p>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                                <button style={{ width: '100%', background: 'none', border: 'none', color: 'var(--brand-primary)', fontWeight: 800, padding: '10px', cursor: 'pointer' }}>+ Add New Class</button>
                            </div>
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}><FaPlus /> Create Session</button>
                    <button className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', background: 'var(--brand-secondary)' }}><FaBullhorn /> Announcement</button>
                </div>
            </div>

            {/* View Toggles */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem' }}>
                <button 
                    onClick={() => setView('live')}
                    style={{ 
                        background: 'none', border: 'none', paddingBottom: '10px',
                        borderBottom: view === 'live' ? '4px solid var(--brand-primary)' : '4px solid transparent',
                        color: view === 'live' ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontWeight: 900, cursor: 'pointer', transition: '0.3s', fontSize: '1.2rem'
                    }}
                >
                    LIVE CLASSROOM
                </button>
                <button 
                    onClick={() => setView('reports')}
                    style={{ 
                        background: 'none', border: 'none', paddingBottom: '10px',
                        borderBottom: view === 'reports' ? '4px solid var(--brand-primary)' : '4px solid transparent',
                        color: view === 'reports' ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontWeight: 900, cursor: 'pointer', transition: '0.3s', fontSize: '1.2rem'
                    }}
                >
                    HISTORY & ANALYTICS
                </button>
            </div>

            {/* Stats Overview */}
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, idx) => (
                    <div key={stat.title} className="card-panel" style={{ 
                        padding: '1.8rem', borderRadius: '24px', background: 'white', border: '1px solid var(--border-subtle)',
                        display: 'flex', alignItems: 'center', gap: '1.5rem'
                    }}>
                        <div style={{ 
                            width: '55px', height: '55px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.4rem',
                            background: idx === 0 ? '#eff6ff' : idx === 1 ? '#ecfdf5' : '#faf5ff',
                            color: idx === 0 ? '#3b82f6' : idx === 1 ? '#10b981' : '#a855f7'
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>{stat.title}</p>
                            <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {view === 'live' ? (
                /* Live Monitor View */
                <div className="card-panel" style={{ background: 'white', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border-subtle)' }}>
                    <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Student Attention Monitor</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Live data for <strong>{selectedClass.name}</strong> • Section {selectedClass.section}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-main)', padding: '6px', borderRadius: '14px' }}>
                            <button onClick={() => setFilter('all')} style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', background: filter === 'all' ? 'white' : 'transparent', color: filter === 'all' ? 'var(--brand-primary)' : 'var(--text-secondary)' }}>All ({liveStudentData.length})</button>
                            <button onClick={() => setFilter('high')} style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', background: filter === 'high' ? 'white' : 'transparent', color: filter === 'high' ? '#10b981' : 'var(--text-secondary)' }}>High Focus ({highAttentionCount})</button>
                            <button onClick={() => setFilter('low')} style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', background: filter === 'low' ? 'white' : 'transparent', color: filter === 'low' ? '#ef4444' : 'var(--text-secondary)' }}>Support Needed ({lowAttentionCount})</button>
                        </div>
                    </div>

                    <div style={{ position: 'relative', marginBottom: '2rem' }}>
                        <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="text" placeholder={`Search among ${selectedClass.totalStudents} students...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '15px 50px', borderRadius: '14px', border: '1px solid var(--border-medium)', background: 'var(--bg-main)', fontSize: '1rem' }} />
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                        <thead>
                            <tr style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 800, textAlign: 'left' }}>
                                <th style={{ padding: '0 1rem' }}>STUDENT NAME</th>
                                <th style={{ padding: '0 1rem' }}>ATTENTION SCORE</th>
                                <th style={{ padding: '0 1rem' }}>STATUS</th>
                                <th style={{ padding: '0 1rem' }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id} style={{ background: 'var(--bg-main)', transition: 'var(--transition-smooth)' }} className="student-row">
                                    <td style={{ padding: '1.2rem', borderRadius: '16px 0 0 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <FaUserCircle size={40} style={{ color: 'var(--border-medium)' }} />
                                            <span style={{ fontWeight: 800, fontSize: '1rem' }}>{student.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.2rem' }}>
                                        <div style={{ width: '180px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 900 }}>
                                                <span style={{ color: student.score >= 50 ? '#10b981' : '#ef4444' }}>{student.score}%</span>
                                                {student.score >= 50 ? <FaArrowUp color="#10b981" /> : <FaArrowDown color="#ef4444" />}
                                            </div>
                                            <div style={{ height: '8px', width: '100%', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${student.score}%`, background: student.score >= 50 ? '#10b981' : '#ef4444', borderRadius: '10px' }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.2rem' }}>
                                        <span style={{ padding: '8px 16px', borderRadius: '14px', fontSize: '0.75rem', fontWeight: 900, background: student.score >= 50 ? '#ecfdf5' : '#fef2f2', color: student.score >= 50 ? '#059669' : '#dc2626' }}>{student.time.toUpperCase()}</span>
                                    </td>
                                    <td style={{ padding: '1.2rem', borderRadius: '0 16px 16px 0' }}>
                                        <button style={{ background: 'white', border: '1px solid var(--border-medium)', padding: '10px 18px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}>Nudge</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* History / Reports View */
                <div className="card-panel" style={{ background: 'white', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border-subtle)' }}>
                     <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Analytics for {selectedClass.name}</h2>
                        <button className="btn-primary" style={{ padding: '0.8rem 1.5rem', background: '#f8fafc', border: '1px solid var(--border-medium)', color: 'var(--text-primary)' }}><FaFileDownload /> Export {selectedClass.name} Data</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
                        {pastSessions.map(session => (
                            <div key={session.id} className="card-panel student-row" style={{ border: '1px solid var(--border-subtle)', padding: '2rem', borderRadius: '24px', background: 'var(--bg-main)' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--brand-primary)', marginBottom: '1rem' }}>SESSION: {session.id}</p>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>{session.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{session.date} • {session.duration}</p>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                                    <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Avg. Attention</span>
                                        <span style={{ color: 'var(--brand-primary)', fontWeight: 900 }}>{session.avgAttention}%</span>
                                    </div>
                                    <div style={{ height: '8px', width: '100%', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${session.avgAttention}%`, background: 'var(--brand-primary)', borderRadius: '10px' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style>{`
                .student-row:hover { transform: scale(1.01); background: #f8fafc !important; }
                .class-option:hover { background: #f1f5f9 !important; color: var(--brand-primary); }
                .flex-between { display: flex; justify-content: space-between; align-items: center; }
            `}</style>
        </div>
    );
};

export default TeacherDashboard;
