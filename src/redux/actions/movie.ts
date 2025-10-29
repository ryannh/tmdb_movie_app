import { Movie, MovieDetail } from '../../types';
import { store } from '../stores';

export const setMovies = (movies: Movie[]) => ({
  type: 'SET_MOVIES',
  data: { movies },
});

export const setMovieDetail = (movie: MovieDetail | null) => ({
  type: 'SET_MOVIE_DETAIL',
  data: { movie },
});

export const setMovieLoading = (loading: boolean) => ({
  type: 'SET_MOVIE_LOADING',
  data: { loading },
});

export const clearMovieData = () => ({
  type: 'CLEAR_MOVIE_DATA',
  data: {},
});

// Dispatch helpers
export const dispatchSetMovies = (movies: Movie[]) => {
  store.dispatch(setMovies(movies));
};

export const dispatchSetMovieDetail = (movie: MovieDetail | null) => {
  store.dispatch(setMovieDetail(movie));
};

export const dispatchSetMovieLoading = (loading: boolean) => {
  store.dispatch(setMovieLoading(loading));
};

export const dispatchClearMovieData = () => {
  store.dispatch(clearMovieData());
};
