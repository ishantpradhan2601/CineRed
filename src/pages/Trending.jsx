import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';
import { useSearch } from '../context/SearchContext';

const Trending = () => {
    const { searchQuery } = useSearch();

    const trendingMovies = movies.filter(m =>
        m.trending && (
            m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.genre.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <section className="section-padding" style={{ marginTop: '60px' }}>
            <div className="container">
                <div className="section-header">
                    <h2>Trending <span>Now</span></h2>
                    <p>The most popular stories currently capturing imaginations worldwide</p>
                </div>
                <div className="movie-grid">
                    {trendingMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trending;
