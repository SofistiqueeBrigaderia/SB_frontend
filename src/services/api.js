import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sofistiqueebrigaderia.herokuapp.com/',
});

export default api;
