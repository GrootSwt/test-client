import axios from "axios";
import { message } from "antd";
import store from "../store";
import router from "../router";

const baseURL = import.meta.env.VITE_BASE_URL;
const defaultInstance = axios.create({
  baseURL,
  timeout: 60000,
  withCredentials: true,
});

export const abortController = {
  value: new AbortController(),
  abort: () => {
    abortController.value.abort();
    abortController.value = new AbortController();
  },
};
defaultInstance.interceptors.request.use((config) => {
  config.signal = abortController.value.signal;
  return config;
});

defaultInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (
      error.code !== "ERR_CANCELED" &&
      store.getState().common.enableAbortRequest
    ) {
      abortController.abort();
    }
    if (store.getState().common.enableDefaultErrorHandler) {
      defaultErrorHandler(error);
    }
    return Promise.reject(error);
  }
);

/**
 * 默认异常处理器
 * @param {AxiosError} error 响应错误
 */
function defaultErrorHandler(error) {
  if (!error.response) {
    switch (error.code) {
      case "ERR_CANCELED":
        break;
      case "ERR_NETWORK":
        abortController.abort();
        message.error({
          content: "网络异常",
        });
        break;
      default:
        router.navigate("/error/other");
        break;
    }
  } else {
    const response = error.response;
    switch (response.status) {
      case 400:
        message.error({
          content: response.data.message,
        });
        break;
      case 401:
        router.navigate("/login");
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

/**
 * error handler
 * @param {AxiosResponse} response
 * @param {(error: AxiosError) => boolean | undefined} customErrorHandler 自定义错误处理器；可以根据业务处理指定的错误，其他的异常情况交给默认错误处理器处理；捕获并成功处理错误后必须返回true，用来终止默认错误处理
 * @param { boolean } useDefaultErrorHandler 是否使用默认的错误处理器，默认为true
 */
export function errorHandler(
  error,
  customErrorHandler,
  useDefaultErrorHandler = true
) {
  if (
    !(
      customErrorHandler &&
      typeof customErrorHandler === "function" &&
      customErrorHandler(error)
    ) &&
    useDefaultErrorHandler
  ) {
    defaultErrorHandler(error);
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
