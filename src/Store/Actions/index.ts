import * as actionTypes from './types';
import * as IActions from '../../Interfaces/Action';

export const setUser = (user: any): IActions.ISetUser => {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
};
