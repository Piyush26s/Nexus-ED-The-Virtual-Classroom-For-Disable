import React from 'react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { user } = useAuth();
    const handleSave = () => {
        alert("Success: Your settings have been updated!");
    };

    return (
        <div className="animate-enter">
            <h1 style={{ marginBottom: '2rem' }}>Settings</h1>

            <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Profile Settings */}
                <div className="card-panel">
                    <h3 style={{ marginBottom: '1.5rem' }}>Profile Information</h3>
                    <div className="form-row">
                        <div className="form-group w-full">
                            <label>Full Name</label>
                            <input className="input-field" defaultValue={user?.name || ''} />
                        </div>
                        <div className="form-group w-full">
                            <label>Email</label>
                            <input className="input-field" defaultValue={user?.email || ''} />
                        </div>
                    </div>
                    <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                </div>

                {/* Password */}
                <div className="card-panel">
                    <h3 style={{ marginBottom: '1.5rem' }}>Change Password</h3>
                    <div className="form-group">
                        <label>Current Password</label>
                        <input className="input-field" type="password" />
                    </div>
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div className="form-group">
                            <label>New Password</label>
                            <input className="input-field" type="password" />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input className="input-field" type="password" />
                        </div>
                    </div>
                    <button className="btn-primary" onClick={handleSave} style={{ background: 'var(--text-dark)' }}>Update Password</button>
                </div>

                {/* Preferences */}
                <div className="card-panel">
                    <h3 style={{ marginBottom: '1.5rem' }}>Preferences</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <label className="flex-center" style={{ justifyContent: 'flex-start', gap: '10px' }}>
                            <input type="checkbox" defaultChecked /> Email Notifications
                        </label>
                        <label className="flex-center" style={{ justifyContent: 'flex-start', gap: '10px' }}>
                            <input type="checkbox" defaultChecked /> Weekly Progress Reports
                        </label>
                        <label className="flex-center" style={{ justifyContent: 'flex-start', gap: '10px' }}>
                            <input type="checkbox" /> Dark Mode (Beta)
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
