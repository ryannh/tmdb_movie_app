export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
};

export type MovieDetail = Movie & {
  runtime?: number;
  genres?: {id: number; name: string}[];
  homepage?: string;
};

export interface MovieState {
  movies: Movie[];
  movieDetail: Movie | null;
  loading: boolean;
  error: string | null;
}
