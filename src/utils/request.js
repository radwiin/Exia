import axios from "axios";

const service = axios.create({
  baseURL: "",
  timeout: 10000
});

export default service;
