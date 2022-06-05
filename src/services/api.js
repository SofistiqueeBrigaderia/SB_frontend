import axios from "axios";

const api = axios.create({
  baseURL: "http://sofistiqueebrigaderia.herokuapp.com/",
});

export default api;
