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
  getNewsDetail: (id) => ({
    type: 'GET_NEWS_DETAIL',
    payload: http().get(`news/${id}`),
  }),
  resetNewsDetail: () => ({
    type: 'RESET_NEWS_DETAIL',
  }),
  getNewsByUser: (keyword = '', token) => ({
    type: 'GET_USER_NEWS',
    payload: http(token).get(`private/news?search=${keyword}`),
  }),
};
