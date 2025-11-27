import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Loader } from 'lucide-react';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Default to Seoul
        const lat = 37.5665;
        const lon = 126.9780;

        // Try to get actual location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    fetchWeather(lat, lon); // Fallback
                }
            );
        } else {
            fetchWeather(lat, lon);
        }
    }, []);

    const fetchWeather = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
            );
            const data = await response.json();
            setWeather(data.current_weather);
        } catch (error) {
            console.error("Weather fetch failed", error);
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = (code) => {
        if (code <= 1) return <Sun />;
        if (code <= 3) return <Cloud />;
        if (code <= 67) return <CloudRain />;
        return <CloudSnow />;
    };

    if (loading) return <div className="glass-panel" style={{ padding: '10px' }}><Loader className="animate-spin" /></div>;
    if (!weather) return null;

    return (
        <div className="glass-panel" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {getWeatherIcon(weather.weathercode)}
            <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{Math.round(weather.temperature)}°C</div>
            </div>
        </div>
    );
};

export default Weather;
