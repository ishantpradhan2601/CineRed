import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, LogOut, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    if (!user) return null;

    return (
        <div className="profile-page section-padding">
            <div className="container">
                <div className="profile-container fade-in appear">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            <img src="/img/profile.jpg" alt="User Profile" />
                        </div>
                        <div className="profile-title">
                            <h1>{user.displayName || 'Cinema Lover'}</h1>
                            <p className="user-status">Premium Member <ShieldCheck size={16} /></p>
                        </div>
                    </div>

                    <div className="profile-details-grid">
                        <div className="detail-item">
                            <div className="detail-icon"><User size={20} /></div>
                            <div className="detail-info">
                                <label>Full Name</label>
                                <p>{user.displayName || 'Not Provided'}</p>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-icon"><Mail size={20} /></div>
                            <div className="detail-info">
                                <label>Email Address</label>
                                <p>{user.email}</p>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-icon"><Calendar size={20} /></div>
                            <div className="detail-info">
                                <label>Member Since</label>
                                <p>{new Date(user.metadata.creationTime).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button className="btn btn-outline" onClick={() => navigate('/movies')}>Explore Library</button>
                        <button className="btn btn-primary" onClick={handleLogout}><LogOut size={18} /> Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
