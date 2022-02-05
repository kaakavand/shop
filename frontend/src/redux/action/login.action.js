import * as api from 'api/user.api';
// import {ACCESS_TOKEN, IS_LOGGED_IN} from 'config/variables.config';

export const login = (data) => {
  return (dispatch, getState) => {
    return api.login(data)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log('login error: 2', error);
      // throw new Error('error')
      return Promise.reject(error);
    });
  }
};