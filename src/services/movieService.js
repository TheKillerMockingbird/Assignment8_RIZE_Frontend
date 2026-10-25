const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch popular movies: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to search movies: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

const FAVORITES_KEY = "movieshelf_favorites";

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavorite(movie) {
  const favorites = getFavorites();
  // Avoid duplicates
  if (!favorites.some((m) => m.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
  return favorites;
}

export function removeFavorite(movieId) {
  const favorites = getFavorites().filter((m) => m.id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
}

export function isFavorite(movieId) {
  return getFavorites().some((m) => m.id === movieId);
}