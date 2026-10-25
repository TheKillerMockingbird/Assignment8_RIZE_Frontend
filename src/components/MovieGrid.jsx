import MovieCard from "./MovieCard";

function MovieGrid({ movies, onFavoritesChange }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onFavoritesChange={onFavoritesChange}
        />
      ))}
    </div>
  );
}

export default MovieGrid;