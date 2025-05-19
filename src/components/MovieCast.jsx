import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../services/MovieService";

import clsx from 'clsx';
import css from './MovieCast.module.css';

export default function MovieCast() {
    const [cast, setCast] = useState([]);
     const { movieId } = useParams();

useEffect(() => {
    fetchMovieCast(movieId).then(setCast).catch(console.error);
}, [movieId]);
    
    return (
        <div>
      {cast.length === 0 && <p>No cast information available.</p>}
      <ul className={clsx(css.container)}>
        {cast.map((person) => (
          <li key={person.name}>
            {person.image && (
              <img
                src={person.image}
                alt={person.name}
                width="250"
                style={{ borderRadius: "10px" }}
              />
            )}
            <p>{person.name}</p>
            <p>Character: {person.character}</p>
          </li>
        ))}
      </ul>
    </div>
    );
}