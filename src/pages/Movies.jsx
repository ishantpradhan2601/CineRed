import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';
import { useSearch } from '../context/SearchContext';

const Movies = () => {
    const { searchQuery } = useSearch();

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="section-padding" style={{ marginTop: '60px' }}>
            <div className="container">
                <div className="section-header">
                    <h2>Full <span>Library</span></h2>
                    <p>Explore our entire collection of cinematic masterpieces</p>
                </div>
                <div className="movie-grid">
                    {filteredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Movies;
