import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onLogin(name);
        }
    };

    return (
        <div className="login-container" style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <div className="glass-panel fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
                <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Hello, who are you?</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="glass-input"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', marginBottom: '2rem', textAlign: 'center', fontSize: '1.5rem' }}
                        autoFocus
                    />
                    <button type="submit" className="glass-btn" style={{ fontSize: '1.2rem', width: '100%' }}>
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
