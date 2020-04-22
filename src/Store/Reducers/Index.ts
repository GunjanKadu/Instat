import { combineReducers } from 'redux';
import { userReducer } from '../Reducers/User';
import { channelReducer } from '../Reducers/Channel';

export const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
