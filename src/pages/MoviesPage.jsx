import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import MovieList from "../components/MovieList";
import { fetchMovies } from '../services/MovieService';

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";
    
    const [debouncedQuery] = useDebounce(query, 300);

    const changeSearchQuery = (event) => {
    const newQuery = event.target.value;
    const nextSearchParams = new URLSearchParams(searchParams);

    if (newQuery !== "") {
      nextSearchParams.set("query", newQuery);
    } else {
      nextSearchParams.delete("query");
    }

    setSearchParams(nextSearchParams);
  };

  useEffect(() => {
    setLoading(true);
    fetchMovies(debouncedQuery)
      .then((data) => setMovies(data.results))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);
    
    return (
        <div>
            <input type="text" value={query} onChange={changeSearchQuery} />
            <button type="submit">Search</button>
      {loading && <strong>Loading movies...</strong>}
      {Array.isArray(movies) && movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
};