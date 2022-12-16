import BaseHttp from './baseHttp'

class Request extends BaseHttp {
    get(url: string, params?: any) {
        return this.getReq({url, params});
    }
    post(url: string, data?: any) {
        return this.postReq({url, data});
    }
}

// 单列模式返回对象
let request;
export default (() => {
    if (request) return request;
    request = new Request();
    return request;
})();