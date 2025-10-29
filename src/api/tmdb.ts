import axios from 'axios';
import { Movie, MovieDetail } from '../types';
import { TMDB_BEARER } from '@env';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDB_BEARER}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export async function fetchPopularMovies(page = 1): Promise<Movie[]> {
  const res = await api.get(`/movie/popular?language=en-US&page=${page}`);
  return res.data.results || [];
}

export async function fetchMovieDetail(id: number): Promise<MovieDetail> {
  const res = await api.get(`/movie/${id}?language=en-US`);
  return res.data;
}
