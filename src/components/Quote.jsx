import React, { useState, useEffect } from 'react';

const QUOTES = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
];

const Quote = () => {
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        // Pick a random quote on load
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, []);

    return (
        <div style={{ textAlign: 'center', maxWidth: '600px', padding: '0 20px', position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>"{quote.text}"</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '5px', textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>{quote.author}</p>
        </div>
    );
};

export default Quote;
