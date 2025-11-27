import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <h1 style={{
            fontSize: '10rem',
            fontWeight: 'bold',
            letterSpacing: '-5px',
            lineHeight: 1,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </h1>
    );
};

export default Clock;
