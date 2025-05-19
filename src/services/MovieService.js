import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'c8477c2c4a9a0fa186191b5d7b6ce33c';
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODQ3N2MyYzRhOWEwZmExODYxOTFiNWQ3YjZjZTMzYyIsIm5iZiI6MTc0NzY0ODA1MS4yNzQsInN1YiI6IjY4MmFmZTMzNWYwNWE3MWRkNDJmNzQ4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kw6bCx8_IhKd-eAhKeifKh7gdc2rC3w5WKHFoj2if08';

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

export const fetchTrendingMovies = async () => {
    const options = {
        headers,
        params: {
            api_key: API_KEY,
        }
    };
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
    return response.data;
};

export const fetchMovies = async (query, page = 1) => {
    const options = {
        headers,
        params: {
            api_key: API_KEY,
            query: query,
            page: page,
        }
    };
    const response = await axios.get(`${BASE_URL}/search/movie`, options);
    return response.data;
};

export const fetchMovieDetails = async (movieId) => {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
            headers,
        });
    
        const data = response.data;

        return {
            title: data.title,
            userScore: data.vote_average,
            overview: data.overview,
            genres: data.genres.map((genre) => genre.name),
            image: data.poster_path
                ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                : null,
        }
};

export const fetchMovieCast = async (movieId) => {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
            headers,
        });
    
        const data = response.data;

         return data.cast.map((person) => ({
      name: person.name,
      character: person.character,
      image: person.profile_path
        ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
        : null,
    }));
};

export const fetchMovieReviews = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
        headers,
    });
    
    const data = response.data;

    return data.results.map((result) => ({
        author: result.author,
        content: result.content,
    }));
};
    