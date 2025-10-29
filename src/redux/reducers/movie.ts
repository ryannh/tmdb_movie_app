import {MovieState} from '../../types';

const initialState: MovieState = {
  movies: [],
  movieDetail: null,
  loading: false,
  error: null,
};

export default function movieReducer(
  state = initialState,
  action: any,
): MovieState {
  switch (action.type) {
    case 'SET_MOVIES':
      return {...state, movies: action.data.movies};
    case 'SET_MOVIE_DETAIL':
      return {...state, movieDetail: action.data.movie};
    case 'SET_MOVIE_LOADING':
      return {...state, loading: action.data.loading};
    case 'CLEAR_MOVIE_DATA':
      return initialState;
    default:
      return state;
  }
}
