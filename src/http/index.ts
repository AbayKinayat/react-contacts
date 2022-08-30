import axios from 'axios';

export const API_URL = process.env.REACT_APP_SERVER_API;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default $api;

