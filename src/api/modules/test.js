import { getRequest } from "../request";
class Test {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getUserList() {
    const url = this.baseUrl + "/getUserList";
    return getRequest(url);
  }

  getUserInfo() {
    const url = this.baseUrl + "/getUserInfo";
    return getRequest(url);
  }
}

export default Test;
