/* eslint-disable prettier/prettier */
import http from '../../helpers/http';

export default {
  destroy: () => ({
    type: 'DESTROY_NEWS',
  }),
  getAllNews: (keyword = '', page = 1) => ({
    type: 'GET_ALL_NEWS',
    payload: http().get(`news?search=${keyword}&page=${page}`),
  }),
  getNewsDetail: (id) => ({
    type: 'GET_NEWS_DETAIL',
    payload: http().get(`news/${id}`),
  }),
  resetNewsDetail: () => ({
    type: 'RESET_NEWS_DETAIL',
  }),
  getNewsByUser: (keyword = '', token, page = 1) => ({
    type: 'GET_USER_NEWS',
    payload: http(token).get(`private/news?search=${keyword}&page=${page}`),
  }),
  deleteNews: (id, token) => ({
    type: 'DELETE',
    payload: http(token).delete(`private/news/${id}`),
  }),
  resetDelete: () => ({
    type: 'RESET_DELETE',
  }),
  editNews: (id, token, form) => ({
    type: 'EDIT',
    payload: http(token).patch(`private/news/${id}`, form),
  }),
  resetEdit: () => ({
    type: 'RESET_EDIT',
  }),
  postNews: (form, token) => ({
    type: 'POST',
    payload: http(token).post('private/news', form),
  }),
  resetPost: () => ({
    type: 'RESET_POST',
  }),
};
