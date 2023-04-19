import axios from "axios";
import store from "../app/store";
const baseURL = import.meta.env.VITE_BASE_URL;
const defaultInstance = axios.create({
  baseURL,
  timeout: 60000,
  withCredentials: true,
});

const abortController = new AbortController();

defaultInstance.interceptors.request.use(
  (config) => {
    config.signal = abortController.signal;
    return config;
  },
  () => {}
);

defaultInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    abortController.abort();
    const globalError = store.getState().global.globalError;
    if (globalError) {
      // TODO 异常处理
      const status = error.response.status;
      switch (status) {
        case 404:
          break;
        default:
          break;
      }
    }
    return Promise.reject(error.response.data);
  }
);

export function getRequest(url, params, config, instance = defaultInstance) {
  return instance.get(url, {
    ...config,
    params,
  });
}

export function postRequest(url, data, config, instance = defaultInstance) {
  return instance.post(url, data, config);
}

export function deleteRequest(url, params, config, instance = defaultInstance) {
  return instance.delete(url, {
    ...config,
    params,
  });
}

export function putRequest(url, data, config, instance = defaultInstance) {
  return instance.put(url, data, config);
}
