import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Play, ChevronLeft, ExternalLink } from 'lucide-react';
import { movies } from '../data/movies';

const MovieDetails = () => {
    const { id } = useParams();
    const movie = movies.find(m => m.id === parseInt(id));

    if (!movie) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2>Movie not found</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="movie-detail-page">
            <div className="detail-hero">
                <div className="detail-hero-bg">
                    <img src={movie.img} alt={movie.title} />
                    <div className="hero-overlay"></div>
                </div>

                <div className="container detail-content">
                    <Link to={-1} className="back-btn"><ChevronLeft size={24} /> Back</Link>

                    <div className="detail-header">
                        <div className="detail-poster hide-mobile">
                            <img src={movie.img} alt={movie.title} />
                        </div>

                        <div className="detail-info">
                            <h1>{movie.title}</h1>
                            <div className="detail-meta">
                                <span className="rating-pill"><Star size={14} fill="#ffc107" stroke="none" /> {movie.rating}</span>
                                <span>{movie.year}</span>
                                <span>{movie.genre}</span>
                            </div>
                            <p className="description">{movie.description}</p>

                            <div className="watch-section">
                                <h3>Available on:</h3>
                                <div className="platform-tags">
                                    {movie.watchOn.map(platform => (
                                        <span key={platform} className="platform-tag">{platform}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-actions">
                                <a href="#trailer" className="btn btn-primary"><Play size={18} fill="currentColor" /> Watch Trailer</a>
                                <button className="btn btn-outline"><ExternalLink size={18} /> Visit Website</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section id="trailer" className="section-padding">
                <div className="container">
                    <div className="section-header">
                        <h2>Official <span>Trailer</span></h2>
                    </div>
                    <div className="trailer-container">
                        <iframe
                            src={movie.trailer}
                            title={`${movie.title} Trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MovieDetails;
