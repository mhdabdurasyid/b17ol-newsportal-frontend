/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

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
};
