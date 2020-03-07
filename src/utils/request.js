import axios from "axios";

// create an axios instance
const service = axios.create({
  baseURL: "", // url = `base url` + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    console.group(`-request-${config.url}-`);
    console.info("url: ", config.url);
    console.info("data: ", config.data);
    console.groupEnd();
    return config;
  },
  error => {
    console.error(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const { status, config, data } = response;
    console.group(`-response-${config.url}-`);
    console.info("url: ", config.url);
    console.info("data: ", data);
    console.groupEnd();
    if (status === 200) {
      return data;
    } else {
      return Promise.reject(data);
    }
  },
  error => {
    console.error(error); // for debug
    return Promise.reject(error);
  }
);

export default service;
