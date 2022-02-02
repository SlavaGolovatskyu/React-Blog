import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://192.168.31.124:5656/',
  headers: {
    'Content-Type': 'application/json',
  },
});
