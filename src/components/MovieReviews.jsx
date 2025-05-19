import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../services/MovieService";

import clsx from 'clsx';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
    const [reviews, setReviews] = useState([]);
     const { movieId } = useParams();

useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews).catch(console.error);
}, [movieId]);
    
    return (
        <div>
      {reviews.length === 0 && <p>We don't have any reviews for this movie.</p>}
      <ul className={clsx(css.container)}>
        {reviews.map((review, index) => (
          <li key={index}>
              <p><strong>Author:</strong> {review.author}</p>
              <p>{review.content}</p>
            </li>
        ))}
      </ul>
    </div>
    );
}