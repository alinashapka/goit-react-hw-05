import { useEffect, useState } from 'react';
import MovieList from "../components/MovieList";
import { fetchTrendingMovies } from '../services/MovieService';

export default function HomePage() {
    const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(data => setMovies(data.results));
  }, []);

  return (
    <main>
      <h1>Trending Today</h1>
      <MovieList movies={movies} />
    </main>
  );
};