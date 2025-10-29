// src/hooks/useMovie.ts
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {RootState} from '../redux/reducers';
import {
  dispatchSetMovieDetail,
  dispatchSetMovieLoading,
  dispatchSetMovies,
} from '../redux/actions/movie';
import {fetchMovieDetail, fetchPopularMovies} from '../api/tmdb';

const useMovie = () => {
  const {movies, movieDetail, loading} = useSelector(
    (state: RootState) => state.movie,
  );
  const [error, setError] = useState<string | null>(null);

  const handleFetchMovies = async (page = 1) => {
    dispatchSetMovieLoading(true);
    try {
      const res = await fetchPopularMovies(page);
      dispatchSetMovies(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      dispatchSetMovieLoading(false);
    }
  };

  const handleFetchMovieDetail = async (id: number) => {
    dispatchSetMovieLoading(true);
    try {
      const res = await fetchMovieDetail(id);
      dispatchSetMovieDetail(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      dispatchSetMovieLoading(false);
    }
  };

  return {
    movies,
    movieDetail,
    loading,
    error,
    handleFetchMovies,
    handleFetchMovieDetail,
  };
};

export default useMovie;
