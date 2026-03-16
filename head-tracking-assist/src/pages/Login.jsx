import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaUserGraduate, FaUser, FaHandsHelping, FaEye, FaBrain } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [profile, setProfile] = useState('none');
    
    const { login } = useAuth();
    const { applyProfile } = useAccessibility();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        applyProfile(profile);
        login({ email }, role);
        navigate(role === 'teacher' ? '/teacher' : '/dashboard');
    };

    return (
        <div className="auth-container animate-enter">
            {/* Left Side - Visual Banner */}
            <div className="auth-banner">
                <div className="banner-content">
                    <h1 className="banner-title">Learning,<br/>without limits.</h1>
                    <p className="banner-desc">
                        Experience the first AI-powered virtual classroom designed with human empathy and accessibility at its core.
                    </p>
                </div>
                {/* Subtle visual elements */}
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', opacity: 0.2 }}>
                    <FaHandsHelping size={200} />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="auth-form-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="logo-icon" style={{ margin: '0 auto 1.5rem' }}>V</div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Welcome Back</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Sign in to continue your learning journey.</p>
                    </div>

                    <div className="role-selector" style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem' }}>
                        <button 
                            type="button" 
                            className={`role-btn ${role === 'student' ? 'active' : ''}`}
                            onClick={() => setRole('student')}
                            style={{
                                flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-medium)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                background: role === 'student' ? 'var(--brand-secondary)' : 'white',
                                color: role === 'student' ? 'white' : 'var(--text-primary)',
                                fontWeight: '700', cursor: 'pointer', transition: 'var(--transition-smooth)'
                            }}
                        >
                            <FaUser /> Student
                        </button>
                        <button 
                            type="button" 
                            className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
                            onClick={() => setRole('teacher')}
                            style={{
                                flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-medium)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                background: role === 'teacher' ? 'var(--brand-secondary)' : 'white',
                                color: role === 'teacher' ? 'white' : 'var(--text-primary)',
                                fontWeight: '700', cursor: 'pointer', transition: 'var(--transition-smooth)'
                            }}
                        >
                            <FaUserGraduate /> Teacher
                        </button>
                    </div>

                    <div className="profile-selection" style={{ marginBottom: '2.5rem' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', marginBottom: '1rem', fontWeight: '800', letterSpacing: '0.05em' }}>
                            TAILOR YOUR ASSISTIVE AI:
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem' }}>
                            {[
                                { id: 'none', label: 'None', icon: <FaUser /> },
                                { id: 'motor', label: 'Motor', icon: <FaHandsHelping /> },
                                { id: 'visual', label: 'Vision', icon: <FaEye /> },
                                { id: 'cognitive', label: 'Learning', icon: <FaBrain /> }
                            ].map(p => (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setProfile(p.id)}
                                    style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                                        padding: '12px 5px', borderRadius: '16px', border: '2px solid',
                                        background: profile === p.id ? 'var(--brand-primary-soft)' : 'white',
                                        borderColor: profile === p.id ? 'var(--brand-primary)' : 'var(--border-subtle)',
                                        cursor: 'pointer', transition: 'var(--transition-smooth)'
                                    }}
                                >
                                    <span style={{ fontSize: '1.4rem', color: profile === p.id ? 'var(--brand-primary)' : 'var(--text-muted)' }}>{p.icon}</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: profile === p.id ? 'var(--brand-primary)' : 'var(--text-secondary)' }}>{p.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary w-full" style={{ padding: '1.2rem', marginTop: '1rem', fontSize: '1.1rem' }}>
                            Sign in to Dashboard
                        </button>
                    </form>

                    <p className="auth-footer" style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
                        New to VirtClass? <Link to="/signup" className="text-primary">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
