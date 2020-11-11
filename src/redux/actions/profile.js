/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
import qs from 'querystring';

export default {
  destroy: () => ({
    type: 'DESTROY_PROFILE',
  }),
  getProfile: (token) => {
    return {
      type: 'GET_PROFILE',
      payload: http(token).get('/private/users'),
    };
  },
  editProfile: (data, token) => ({
    type: 'EDIT_PROFILE',
    payload: http(token).patch('/private/users', qs.stringify(data)),
  }),
  resetEdit: () => ({
    type: 'RESET_EDIT',
  }),
};
