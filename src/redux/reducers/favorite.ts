import { Movie } from '../../types';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/favorite';

interface FavoriteState {
  favorites: Movie[];
}

interface AddFavoriteAction {
  type: typeof ADD_FAVORITE;
  payload: Movie;
}

interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: number;
}

type FavoriteAction = AddFavoriteAction | RemoveFavoriteAction;

const initialState: FavoriteState = {
  favorites: [],
};

export default function favoriteReducer(
  state = initialState,
  action: FavoriteAction,
): FavoriteState {
  switch (action.type) {
    case ADD_FAVORITE:
      if (state.favorites.some(m => m.id === action.payload.id)) {
        return state;
      }
      return { ...state, favorites: [...state.favorites, action.payload] };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(m => m.id !== action.payload),
      };

    default:
      return state;
  }
}
