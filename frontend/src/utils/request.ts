import axios from 'axios';
import Cookies from 'js-cookie';

export const getRequestHeaders = () => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const csrf = Cookies.get('csrftoken');
  if (csrf) {
    headers['X-CSRFToken'] = csrf;
  }

  return headers;
};

export const request = (
  url: string,
  {
    data,
    method = 'get',
    headers = {},
  }: {
    data?: unknown;
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
    headers?: Record<string, string>;
  } = {}
) => {
  return axios({
    url,
    method,
    data,
    headers: {
      ...getRequestHeaders(),
      ...headers,
    },
    withCredentials: true,
  });
};