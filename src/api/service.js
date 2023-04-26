import { abortController } from "./request";
import Test from "./modules/test";
const service = {
  test: new Test("/test"),
  abortAllRequest: () => {
    abortController.abort();
  },
};

export default service;
