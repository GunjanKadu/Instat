/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:47:27
 *
 */

import { combineReducers } from 'redux';
import { userReducer } from '../Reducers/User';
import { channelReducer } from '../Reducers/Channel';
import { colorReducer } from './Colors';

export const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
  color: colorReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
