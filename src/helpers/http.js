import axios from 'axios';
import {API_URL} from '@env';

const http = (token = false) => {
  console.log(API_URL);
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export default http;
