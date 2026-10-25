import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovieContext();

  const inWatchlist = isInWatchlist(movie.id);

  function handleClick() {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/300x450/667eea/ffffff?text=No+Poster";

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>
          <span className="movie-year">
            {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
          </span>
        </div>

        <button
          className={`favorite-button ${inWatchlist ? "favorited" : ""}`}
          onClick={handleClick}
        >
          {inWatchlist ? "♥ Remove from Watchlist" : "♡ Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;