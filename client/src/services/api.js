import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 9000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && !token.startsWith('demo-')) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const refreshToken = localStorage.getItem('refresh_token');
    if (error.response?.status === 401 && refreshToken && refreshToken !== 'demo-refresh' && !original._retry) {
      original._retry = true;
      const { data } = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });
      localStorage.setItem('access_token', data.data.accessToken);
      localStorage.setItem('refresh_token', data.data.refreshToken);
      original.headers.Authorization = `Bearer ${data.data.accessToken}`;
      return api(original);
    }
    return Promise.reject(error);
  },
);

export default api;
