import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaUser, FaUserGraduate, FaCheckCircle, FaChevronLeft } from 'react-icons/fa';

const Signup = () => {
    const navigate = useNavigate();
    const { signup, requestOTP, loading, error: authError } = useAuth();
    
    // Steps: 0 = Info, 1 = OTP
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '', role: 'student'
    });
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signupError, setSignupError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = async (e) => {
        e.preventDefault();
        setSignupError(null);

        if (formData.password !== formData.confirmPassword) {
            setSignupError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setSignupError("Password must be at least 6 characters");
            return;
        }

        // Request OTP before moving to next step
        const result = await requestOTP(formData.email);
        if (result.success) {
            setStep(1);
        } else {
            setSignupError(result.message || 'Failed to send OTP. Please check your email.');
        }
    };

    const handleFinalSignup = async (e) => {
        e.preventDefault();
        setSignupError(null);

        if (!otp || otp.length < 4) {
            setSignupError("Please enter a valid OTP");
            return;
        }

        const result = await signup({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            otp: otp
        });

        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2500);
        } else {
            setSignupError(result.message || 'Verification failed. Please try again.');
        }
    };

    return (
        <div className="auth-container animate-enter">
            {/* Left Side - Visual Banner */}
            <div className="auth-banner">
                <div className="banner-content">
                    <h1 className="banner-title">Join the<br/>Future of Learning.</h1>
                    <p className="banner-desc">
                        Create an account to access personalized AI-powered accessible education tools.
                    </p>
                    <div className="illustration-placeholder">
                        <div className="abstract-shape shape-1"></div>
                        <div className="abstract-shape shape-2"></div>
                        <div className="access-icon-large">🎓</div>
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="auth-form-wrapper">
                <div className="auth-card">
                    {step === 0 ? (
                        <>
                            <div className="auth-header">
                                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Create Account</h2>
                                <p style={{ color: 'var(--text-secondary)' }}>Get started with your free account today.</p>
                            </div>

                            {(signupError || authError) && (
                                <div className="error-alert">
                                    {signupError || authError}
                                </div>
                            )}

                            <div className="role-selector" style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                <button 
                                    type="button" 
                                    className={`role-btn ${formData.role === 'student' ? 'active' : ''}`}
                                    onClick={() => setFormData({...formData, role: 'student'})}
                                    style={{
                                        flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-medium)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                        background: formData.role === 'student' ? 'var(--brand-secondary)' : 'white',
                                        color: formData.role === 'student' ? 'white' : 'var(--text-primary)',
                                        fontWeight: '700', cursor: 'pointer', transition: 'var(--transition-smooth)'
                                    }}
                                >
                                    <FaUser size={18} /> Student
                                </button>
                                <button 
                                    type="button" 
                                    className={`role-btn ${formData.role === 'teacher' ? 'active' : ''}`}
                                    onClick={() => setFormData({...formData, role: 'teacher'})}
                                    style={{
                                        flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-medium)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                        background: formData.role === 'teacher' ? 'var(--brand-secondary)' : 'white',
                                        color: formData.role === 'teacher' ? 'white' : 'var(--text-primary)',
                                        fontWeight: '700', cursor: 'pointer', transition: 'var(--transition-smooth)'
                                    }}
                                >
                                    <FaUserGraduate size={18} /> Teacher
                                </button>
                            </div>

                            <form onSubmit={handleNextStep}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input 
                                        className="input-field" 
                                        name="name"
                                        placeholder="Enter your name" 
                                        value={formData.name}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input 
                                        className="input-field" 
                                        type="email" 
                                        name="email"
                                        placeholder="name@example.com" 
                                        value={formData.email}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <input 
                                                className="input-field" 
                                                type={showPassword ? 'text' : 'password'} 
                                                name="password"
                                                placeholder="Create password" 
                                                value={formData.password}
                                                onChange={handleChange}
                                                required 
                                                style={{ paddingRight: '40px' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{
                                                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                                    background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
                                                }}
                                            >
                                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm</label>
                                        <div style={{ position: 'relative' }}>
                                            <input 
                                                className="input-field" 
                                                type={showConfirmPassword ? 'text' : 'password'} 
                                                name="confirmPassword"
                                                placeholder="Confirm" 
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required 
                                                style={{ paddingRight: '40px' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                style={{
                                                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                                    background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
                                                }}
                                            >
                                                {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn-primary w-full"
                                    disabled={loading}
                                    style={{ padding: '1.2rem', marginTop: '1rem', fontSize: '1.1rem' }}
                                >
                                    {loading ? 'Sending OTP...' : 'Send Verification Code'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={() => setStep(0)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none',
                                    color: 'var(--brand-primary)', cursor: 'pointer', fontWeight: 600, marginBottom: '1.5rem',
                                    padding: 0
                                }}
                            >
                                <FaChevronLeft size={12} /> Back
                            </button>

                            <div className="auth-header">
                                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Verify Email</h2>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    We've sent a code to <br/>
                                    <strong>{formData.email}</strong>
                                </p>
                            </div>

                            {(signupError || authError) && (
                                <div className="error-alert">
                                    {signupError || authError}
                                </div>
                            )}

                            {success && (
                                <div className="success-alert">
                                    <FaCheckCircle style={{ marginRight: '8px' }} />
                                    Account created successfully! Redirecting...
                                </div>
                            )}

                            <form onSubmit={handleFinalSignup}>
                                <div className="form-group">
                                    <label>OTP Verification Code</label>
                                    <input 
                                        className="input-field" 
                                        type="text"
                                        placeholder="000000" 
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength={6}
                                        required 
                                        style={{ 
                                            textAlign: 'center', 
                                            fontSize: '1.8rem', 
                                            letterSpacing: '0.5rem',
                                            fontWeight: 800,
                                            padding: '1rem'
                                        }}
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn-primary w-full"
                                    disabled={loading || success}
                                    style={{ 
                                        padding: '1.2rem', 
                                        marginTop: '1rem', 
                                        fontSize: '1.1rem',
                                        background: 'var(--brand-secondary)'
                                    }}
                                >
                                    {loading ? 'Verifying...' : 'Verify & Create Account'}
                                </button>
                                
                                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    Didn't receive the code? <button type="button" onClick={() => requestOTP(formData.email)} style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', fontWeight: 700, cursor: 'pointer' }}>Resend</button>
                                </p>
                            </form>
                        </>
                    )}

                    <p className="auth-footer" style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
                        Already have an account? <Link to="/login" className="text-secondary" style={{ fontWeight: 700 }}>Login</Link>
                    </p>
                </div>
            </div>

            <style>{`
                .error-alert {
                    padding: 1rem; background: #fee2e2; color: #b91c1c; border-radius: 12px;
                    margin-bottom: 1.5rem; font-size: 0.9rem; font-weight: 600; text-align: center;
                    border: 1px solid #fecaca;
                }
                .success-alert {
                    padding: 1rem; background: #dcfce7; color: #15803d; border-radius: 12px;
                    margin-bottom: 1.5rem; font-size: 0.9rem; font-weight: 600; text-align: center;
                    border: 1px solid #bbf7d0; display: flex; align-items: center; justify-content: center;
                }
                .animate-enter {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Signup;
