import axios from 'axios';
import { CONFIG } from '../config';

// const getToken = () => true;
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, PUT, GET, OPTIONS',
    'Access-Control-Max-Age': 86400,
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    schema: CONFIG.SCHEMA
  },
});

// api.interceptors.request.use(config => {
//   const token = getToken();
//   if (token) {
//     config.headers['x-access-token'] = token;
//   }

//   return config;
// })

export const request = async (method, url, body) => {
  try {
    const response = await api({
      method,
      url,
      data: body ? JSON.stringify(body) : null
    });

    return response.data
  } catch (error) {
    if (error.response.status >= 400 && error.response.status <= 500) throw error.response.data;
  }
}
