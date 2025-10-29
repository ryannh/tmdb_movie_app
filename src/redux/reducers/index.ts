import { combineReducers } from 'redux';
import movieReducer from './movie';
import favoriteReducer from './favorite';

const rootReducer = combineReducers({
  movie: movieReducer,
  favorite: favoriteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
