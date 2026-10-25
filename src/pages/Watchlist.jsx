import { useMovieContext } from "../contexts/MovieContext";
import MovieGrid from "../components/MovieGrid";

function Watchlist() {
  const { watchlist } = useMovieContext();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you want to watch later</p>
      </div>

      {watchlist.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Your watchlist is empty. Add some movies!
        </p>
      ) : (
        <MovieGrid movies={watchlist} />
      )}
    </main>
  );
}

export default Watchlist;