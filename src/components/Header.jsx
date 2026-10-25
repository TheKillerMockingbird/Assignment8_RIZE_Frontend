import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../services/movieService";

function Header({ setSearchResults }) {
  const [query, setQuery] = useState("");

  async function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSearchResults(null);
      return;
    }

    try {
      const data = await searchMovies(value);
      setSearchResults(data.results);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    }
  }

  function handleButtonClick() {
    if (query.trim() === "") {
      setSearchResults(null);
      return;
    }
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
          <Link to="/watchlist" className="nav-link">
            Watchlist
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