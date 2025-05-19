import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from "./Navigation";

import clsx from 'clsx';
import css from './App.module.css';

const HomePage = lazy(() => import('../pages/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage'));
const MovieCast = lazy(() => import('./MovieCast'));
const MovieReviews = lazy(() => import('./MovieReviews'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function App() {

  return (
    <div className={clsx(css.container)}>
<Navigation/>

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={ <MovieReviews/>}/>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App