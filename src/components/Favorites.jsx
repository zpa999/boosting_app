import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Globe } from 'lucide-react';

const FavoriteSlot = ({ fav, index, onClick, onRemove }) => {
    const [showDelete, setShowDelete] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (fav) {
            timeoutRef.current = setTimeout(() => {
                setShowDelete(true);
            }, 3000);
        }
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setShowDelete(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            onClick={(e) => {
                // Don't trigger slot click if clicking on delete button
                if (e.target.closest('.delete-btn')) {
                    return;
                }
                onClick(index);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="glass-btn"
            style={{
                height: '60px',
                width: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderRadius: '16px',
                padding: 0,
                transition: 'all 0.3s ease',
                background: fav ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                border: fav ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.2)'
            }}
            title={fav ? fav.name : "Add Favorite"}
        >
            {fav ? (
                <>
                    <img
                        src={`https://www.google.com/s2/favicons?sz=64&domain=${fav.url}`}
                        alt={fav.name}
                        style={{ width: '32px', height: '32px', borderRadius: '8px' }}
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
                    />
                    <Globe size={24} style={{ display: 'none', color: 'white' }} />

                    {showDelete && (
                        <button
                            onClick={(e) => onRemove(e, index)}
                            className="delete-btn fade-in"
                            style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: '#ff5f56',
                                borderRadius: '50%',
                                border: 'none',
                                color: 'white',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                animationDuration: '0.3s'
                            }}
                        >
                            <X size={12} />
                        </button>
                    )}
                </>
            ) : (
                <Plus size={20} style={{ opacity: 0.4, color: 'white' }} />
            )}
        </div>
    );
};

const Favorites = () => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('momentum_favorites');
        const initial = saved ? JSON.parse(saved) : [];
        if (initial.length < 20) {
            return [...initial, ...Array(20 - initial.length).fill(null)];
        }
        return initial.slice(0, 20);
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlot, setCurrentSlot] = useState(null);
    const [formData, setFormData] = useState({ name: '', url: '' });

    useEffect(() => {
        localStorage.setItem('momentum_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleSlotClick = (index) => {
        if (favorites[index]) {
            window.open(favorites[index].url, '_blank');
        } else {
            setCurrentSlot(index);
            setFormData({ name: '', url: '' });
            setIsModalOpen(true);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.url) return;

        let url = formData.url;
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }

        const newFavorites = [...favorites];
        newFavorites[currentSlot] = { name: formData.name, url };
        setFavorites(newFavorites);
        setIsModalOpen(false);
    };

    const removeFavorite = (e, index) => {
        e.stopPropagation();
        if (window.confirm("Remove this favorite?")) {
            const newFavorites = [...favorites];
            newFavorites[index] = null;
            setFavorites(newFavorites);
        }
    };

    return (
        <>
            <div className="fade-in" style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '15px',
                maxWidth: '800px',
                margin: '2rem auto'
            }}>
                {favorites.map((fav, index) => (
                    <FavoriteSlot
                        key={index}
                        fav={fav}
                        index={index}
                        onClick={handleSlotClick}
                        onRemove={removeFavorite}
                    />
                ))}
            </div>

            {/* Modal Dialog */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }} onClick={() => setIsModalOpen(false)}>
                    <div
                        className="glass-panel"
                        style={{
                            padding: '2rem',
                            width: '400px',
                            maxWidth: '90%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Add Favorite</h3>

                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="e.g. Google"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>URL</label>
                                <input
                                    type="text"
                                    placeholder="e.g. google.com"
                                    value={formData.url}
                                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="glass-btn"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="glass-btn"
                                    style={{ flex: 1, justifyContent: 'center', background: 'rgba(255,255,255,0.3)' }}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Favorites;
