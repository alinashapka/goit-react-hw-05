import { Suspense, useEffect, useRef, useState } from "react";
import {
    NavLink,
    useParams,
    Outlet,
    Link,
    useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../services/MovieService";

import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
    const location = useLocation();
  const backlinkRef = useRef(location.state?.from ?? "/");

  const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

     useEffect(() => {
    fetchMovieDetails(movieId).then((data) => setMovie(data));
  }, [movieId]);
    
    return (
        <div>
            <Link to={backlinkRef.current}>Go back</Link>

            {movie && (
                <div className={clsx(css.container)}>
                    {movie.image && (
            <img
              src={movie.image}
              alt={movie.title}
              width="250"
              style={{ borderRadius: "10px" }}
            />
                    )}
                      <div className={clsx(css.wrapper)}>
            <h2>{movie.title}</h2>
            <p>
              <strong>User score:</strong> {Math.round(movie.userScore * 10)}%
            </p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>{movie.genres.join(", ")}</p>
          </div>
                </div>
            )}

            <hr />
      <h3>Additional information</h3>
      <ul>
        <li>
          <NavLink to="cast" state={{ from: backlinkRef.current }}>Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews" state={{ from: backlinkRef.current }}>Reviews</NavLink>
        </li>
      </ul>

            <Suspense fallback={<strong>Loading information...</strong>}>
        <Outlet />
      </Suspense>
        </div>
    );
};