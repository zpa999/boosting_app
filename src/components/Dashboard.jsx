import React, { useState } from 'react';
import Clock from './Clock';
import Weather from './Weather';
import Todo from './Todo';
import Quote from './Quote';
import Favorites from './Favorites';
import { LogOut, Image as ImageIcon } from 'lucide-react';

const BACKGROUNDS = [
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
];

const Dashboard = ({ user, onLogout }) => {
    const [bgIndex, setBgIndex] = useState(0);
    const [showTodo, setShowTodo] = useState(false);

    const changeBackground = () => {
        setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    };

    return (
        <div style={{
            backgroundImage: `url(${BACKGROUNDS[bgIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100vw',
            position: 'relative',
            transition: 'background-image 0.5s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px'
        }}>
            {/* Overlay for readability */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.2)',
                zIndex: 0
            }} />

            {/* Top Bar */}
            <div style={{ zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="glass-panel" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 'bold' }}>Momentum Clone</span>
                </div>
                <Weather />
            </div>

            {/* Center */}
            <div style={{ zIndex: 1, textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <Clock />
                <h2 style={{ fontSize: '3rem', marginTop: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    Good day, {user}.
                </h2>
                <Favorites />
            </div>

            {/* Bottom Bar */}
            <div style={{ zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={changeBackground} className="glass-btn" title="Change Background">
                        <ImageIcon size={20} />
                    </button>
                    <button onClick={onLogout} className="glass-btn" title="Logout">
                        <LogOut size={20} />
                    </button>
                </div>

                <Quote />

                <div style={{ position: 'relative' }}>
                    <button
                        className="glass-btn"
                        onClick={() => setShowTodo(!showTodo)}
                    >
                        Todo
                    </button>
                    {showTodo && (
                        <div style={{ position: 'absolute', bottom: '50px', right: '0', width: '300px' }}>
                            <Todo />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
