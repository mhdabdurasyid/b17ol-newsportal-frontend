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
  resetRegister: () => ({
    type: 'RESET_IS_REGISTER',
  }),
};
