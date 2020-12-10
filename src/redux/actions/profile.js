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
  editProfile: (form, token) => ({
    type: 'EDIT_PROFILE',
    payload: http(token).patch('/private/users', form),
  }),
  resetEdit: () => ({
    type: 'RESET_EDIT',
  }),
  updatePassword: (data, token) => ({
    type: 'UPDATE_PASSWORD',
    payload: http(token).put('/private/users/password', qs.stringify(data)),
  }),
};
