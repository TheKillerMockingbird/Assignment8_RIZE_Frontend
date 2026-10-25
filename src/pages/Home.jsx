import { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { getPopularMovies } from "../services/movieService";

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If the user is searching, just show the search results
    if (searchResults !== null) {
      setMovies(searchResults);
      setLoading(false);
      setError(null);
      return;
    }

    // Otherwise fetch popular movies
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [searchResults]);

  // Show loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show error message
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Normal view
  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults ? "Search Results" : "Popular Movies"}</h2>
        <p>Discover and save your favorite films</p>
      </div>
      <MovieGrid movies={movies} />
    </main>
  );
}

export default Home;