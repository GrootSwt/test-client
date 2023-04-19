import { getRequest } from "../request";
class Test {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getSuccessList() {
    const url = this.baseUrl + "/getSuccessList";
    return getRequest(url);
  }

  getError() {
    const url = this.baseUrl + "/getErrorList";
    return getRequest(url);
  }
}

export default Test;
