import React from 'react';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';
import { useSearch } from '../context/SearchContext';

const Home = () => {
    const { searchQuery } = useSearch();

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const featuredMovies = filteredMovies.slice(0, 6);

    return (
        <>
            <Hero />
            <section className="section-padding">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured <span>Movies</span></h2>
                        <p>Hand-picked blockbusters curated for you</p>
                    </div>
                    <div className="movie-grid">
                        {featuredMovies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
