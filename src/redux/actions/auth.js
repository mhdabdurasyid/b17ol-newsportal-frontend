import http from '../../helpers/http';
import qs from 'querystring';

export default {
  login: (data) => ({
    type: 'LOGIN',
    payload: http().post('/auth/login', qs.stringify(data)),
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
  register: (data) => ({
    type: 'REGISTER',
    payload: http().post('/users', qs.stringify(data)),
  }),
  reset: () => ({
    type: 'RESET',
  }),
  forgotPassword: (data) => ({
    type: 'FORGOT_PASSWORD',
    payload: http().post('/users/email', qs.stringify(data)),
  }),
  resetPassword: (id, data) => ({
    type: 'RESET_PASSWORD',
    payload: http().put(`/users/resetPassword/${id}`, qs.stringify(data)),
  }),
};
