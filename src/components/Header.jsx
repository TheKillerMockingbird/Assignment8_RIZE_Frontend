import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../services/movieService";

function Header({ setSearchResults }) {
  const [query, setQuery] = useState("");

  async function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);

    // If the search box is empty, go back to popular movies
    if (value.trim() === "") {
      setSearchResults(null);
      return;
    }

    try {
      const data = await searchMovies(value);
      setSearchResults(data.results); // just the array of movies
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    }
  }

  // Optional: also search when the button is clicked
  function handleButtonClick() {
    if (query.trim() === "") {
      setSearchResults(null);
      return;
    }
    // Re-trigger the same logic
    handleSearch({ target: { value: query } });
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">
          MovieShelf
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={handleSearch}
          />
          <button className="search-button" onClick={handleButtonClick}>
            Search
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;