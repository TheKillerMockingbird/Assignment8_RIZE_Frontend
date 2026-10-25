import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export function useMovieContext() {
  return useContext(MovieContext);
}

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("movieshelf_watchlist");
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movieshelf_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchlist(movie) {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }

  function removeFromWatchlist(movieId) {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  }

  function isInWatchlist(movieId) {
    return watchlist.some((m) => m.id === movieId);
  }

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}