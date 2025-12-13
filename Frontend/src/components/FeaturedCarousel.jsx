import React, { useMemo } from 'react';
import SweetCard from './SweetCard';
import './FeaturedCarousel.css';

const FeaturedCarousel = ({ sweets }) => {
    // Memoize the selection so it doesn't change on every render
    const { specialSweet, trendingSweets } = useMemo(() => {
        if (!sweets || sweets.length === 0) return { specialSweet: null, trendingSweets: [] };

        // Simple logic: First available sweet is special, rest are trending
        // In a real app, this could be based on a 'isSpecial' flag or random logic
        const special = sweets.find(s => s.image) || sweets[0];
        const trending = sweets.filter(s => s.id !== special.id);

        // Duplicate list for infinite scroll effect
        return { specialSweet: special, trendingSweets: [...trending, ...trending] };
    }, [sweets]);

    if (!specialSweet) return null;

    return (
        <div className="featured-container">
            <div className="todays-special-section">
                <h2 className="section-title">✨ Today's Special</h2>
                <div className="special-card-wrapper">
                    <SweetCard sweet={specialSweet} />
                </div>
            </div>

            <div className="trending-section">
                <h2 className="section-title">🔥 Trending Now</h2>
                <div className="carousel-track-container">
                    <div className="carousel-track">
                        {trendingSweets.map((sweet, index) => (
                            <div key={`${sweet.id}-${index}`} className="carousel-item">
                                <SweetCard sweet={sweet} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCarousel;
