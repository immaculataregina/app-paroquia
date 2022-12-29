import axios from 'axios';

const getToken = () => true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_AUTENTICACAO,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, PUT, GET, OPTIONS',
    'Access-Control-Max-Age': 86400
  }
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['x-access-token'] = token;
  }

  return config;
})

export const request = async (url, method, body) => {
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
