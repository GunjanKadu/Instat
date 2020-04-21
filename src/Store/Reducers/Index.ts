import { combineReducers } from 'redux';
import { userReducer } from '../Reducers/User';

export const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
