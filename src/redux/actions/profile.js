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
  editProfile: (form, token) => ({
    type: 'EDIT_PROFILE',
    payload: http(token).patch('/private/users', form),
  }),
  resetEdit: () => ({
    type: 'RESET_EDIT',
  }),
};
