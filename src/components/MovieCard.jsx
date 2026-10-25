import { useState, useEffect } from "react";
import {
  isFavorite,
  saveFavorite,
  removeFavorite,
} from "../services/movieService";

function MovieCard({ movie, onFavoritesChange }) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(movie.id));
  }, [movie.id]);

  function handleFavoriteClick() {
    if (favorited) {
      removeFavorite(movie.id);
      setFavorited(false);
    } else {
      saveFavorite(movie);
      setFavorited(true);
    }

    if (onFavoritesChange) {
      onFavoritesChange();
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
            {movie.release_date
              ? movie.release_date.substring(0, 4)
              : "N/A"}
          </span>
        </div>

        <button
          className={`favorite-button ${favorited ? "favorited" : ""}`}
          onClick={handleFavoriteClick}
        >
          {favorited ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;