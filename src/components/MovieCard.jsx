import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const MovieCard = ({ movie }) => {
    return (
        <article className="movie-card fade-in appear">
            <div className="movie-img">
                <img src={movie.img} alt={movie.title} loading="lazy" />
                <div className="movie-overlay">
                    <Link to={`/movie/${movie.id}`} className="btn btn-primary">Details</Link>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.genre} • {movie.year}</p>
                <div className="rating">
                    <Star size={14} fill="#ffc107" stroke="none" /> <span>{movie.rating}</span>
                </div>
            </div>
        </article>
    );
};

export default MovieCard;
