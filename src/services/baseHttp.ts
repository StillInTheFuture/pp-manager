import { BASE_URL, HEADERS } from './config';
import type { IAxiosRequest, ICustomResponse } from './types';
import instance from './intercept';
import { ElMessage } from 'element-plus'
 
// 需要跳转到login的错误码，如登录凭证失效/登录凭证未提供/非管理员账号等
const INVALID_CODE = [403, 401];

class BaseHttp  {
    // 外部传入的baseUrl
    protected baseURL: string = BASE_URL;
    // 自定义header头
    protected headers: object = HEADERS;
 
    private apiAxios({ baseURL = this.baseURL, headers = this.headers, method, url, data, params, responseType }: IAxiosRequest): Promise<ICustomResponse> {
        return new Promise((resolve, reject) => {
            instance({
                baseURL,
                headers,
                method,
                url,
                params,
                data,
                responseType
            }).then((res) => {
                if (res.status === 200) {
                    const { retCode, message } = res.data || {};
                    if(retCode!= 200){
                        ElMessage.error(message);
                        if(INVALID_CODE.includes(retCode)){
                            // todo
                            // toLogin()
                        }
                    }
                }
                resolve(res.data)
            }).catch((err) => {
                console.log(err)
                // reject(err);
            });
        });
    }
 
    /**
     * GET类型的网络请求
     */
    protected getReq({ baseURL, headers, url, data, params, responseType }: IAxiosRequest) {
        return this.apiAxios({ baseURL, headers, method: 'GET', url, data, params, responseType });
    }
 
    /**
     * POST类型的网络请求
     */
    protected postReq({ baseURL, headers, url, data, params, responseType }: IAxiosRequest) {
        return this.apiAxios({ baseURL, headers, method: 'POST', url, data, params, responseType });
    }
 
    /**
     * PUT类型的网络请求
     */
    protected putReq({ baseURL, headers, url, data, params, responseType }: IAxiosRequest) {
        return this.apiAxios({ baseURL, headers, method: 'PUT', url, data, params, responseType });
    }
 
    /**
     * DELETE类型的网络请求
     */
    protected deleteReq({ baseURL, headers, url, data, params, responseType }: IAxiosRequest) {
        return this.apiAxios({ baseURL, headers, method: 'DELETE', url, data, params, responseType });
    }
}

export default BaseHttp