import * as actionTypes from './types';
import * as IActions from '../../Interfaces/Action';
import { IUser } from '../../Interfaces/Auth';

export const setUser = (user: IUser): IActions.ISetUser => {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
};
