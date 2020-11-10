/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  destroy: () => ({
    type: 'DESTROY_NEWS',
  }),
  getAllNews: (keyword = '') => ({
    type: 'GET_ALL_NEWS',
    payload: http().get(`news?search=${keyword}`),
  }),
};
