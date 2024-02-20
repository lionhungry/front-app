import axios from 'axios';
import Promise from 'bluebird';
import { API_ROOT } from '../configs/env-vars';

Promise.config({
  cancellation: true,
});

// overwrite native Promise implementation with Bluebird's
window.Promise = Promise;

// export const authorizationHeader = () => ({
//   Authorization: getAccessToken(),
// });

// eslint-disable-next-line import/no-anonymous-default-export
export default (headers = {}) => {
  const service = axios.create({
    baseURL: `${API_ROOT}`, // url of the api
    headers: {
      // Authorization: getAccessToken(),
      Authorization:'',
      ...headers,
    },
  });
  service.interceptors.response.use(
    response => response,
    async error => {
      const errorResponse = error.response;
      if (process?.env.NODE_ENV === 'production') {
        switch (errorResponse.status) {
          case 403:
            window.location.pathname = '/';
            break;
          default:
            break;
        }
      }
      throw error;
    }
  );
  return service;
};
