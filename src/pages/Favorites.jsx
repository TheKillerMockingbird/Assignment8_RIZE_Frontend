import { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import { getFavorites } from "../services/movieService";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  function handleFavoritesChange() {
    setFavorites(getFavorites());
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>

      {favorites.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No favorites yet. Go add some movies!
        </p>
      ) : (
        <MovieGrid
          movies={favorites}
          onFavoritesChange={handleFavoritesChange}
        />
      )}
    </main>
  );
}

export default Favorites;