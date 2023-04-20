import axios from "axios";
import { message } from "antd";
import store from "../app/store";
import router from "../router/index";

const baseURL = import.meta.env.VITE_BASE_URL;
const defaultInstance = axios.create({
  baseURL,
  timeout: 60000,
  withCredentials: true,
});

export const abortController = new AbortController();
defaultInstance.interceptors.request.use((config) => {
  config.signal = abortController.signal;
  return config;
});

defaultInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (store.getState().global.globalAbort) {
      abortController.abort();
    }
    if (store.getState().global.globalError) {
      error.response && errorHandler(error.response);
    }
    return Promise.reject(error.response);
  }
);

/**
 * error handler
 * @param {AxiosResponse} response
 * @param {(response: AxiosResponse) => boolean | null | undefined} customErrorHandler custom error handler, must return true or falsez
 */
export function errorHandler(response, customErrorHandler) {
  if (
    !(
      customErrorHandler &&
      typeof customErrorHandler === "function" &&
      customErrorHandler(response)
    )
  ) {
    switch (response.status) {
      case 401:
        router.navigate("/login");
        break;
      case 400:
        message.error({
          content: response.data.message,
        });
        break;
      case 404:
        router.navigate("/error/404");
        break;
      case 500:
      case 503:
      case 504:
        router.navigate("/error/" + response.status);
        break;
      default:
        router.navigate("/error/other");
        break;
    }
  }
}

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
