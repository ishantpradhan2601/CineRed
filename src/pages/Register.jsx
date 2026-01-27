import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';
import { sendWelcomeEmail } from '../services/emailService';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setSuccess('');
            setLoading(true);
            await signup(email, password, displayName);

            setSuccess('Account created! Preparing your welcome letter...');

            // Trigger Welcome Email logic (Now handles persistence)
            await sendWelcomeEmail({ email, displayName });

            setSuccess('Welcome letter sent to your dashboard! Redirecting...');

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError('Failed to create an account. ' + err.message);
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card fade-in appear">
                <h1>Sign <span>Up</span></h1>
                {error && (
                    <div className="auth-error">
                        <AlertCircle size={18} /> {error}
                    </div>
                )}
                {success && (
                    <div className="auth-success">
                        <ShieldCheck size={18} /> {success}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-with-icon">
                            <User size={18} />
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-with-icon">
                            <Mail size={18} />
                            <input
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Get Started'}
                    </button>
                </form>
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
