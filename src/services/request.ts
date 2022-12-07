import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus'
import Storage from '@/utils/storage'
import { BASE_URL, TIME_OUT } from './config';
 
// 需要跳转到login的错误码，如登录凭证失效/登录凭证未提供/非管理员账号等
const INVALID_CODE = [403, 401];

type PendingType = {
    url: string | undefined,
    method: string | undefined,
    cancel: Function
}

declare module "axios" {
    interface AxiosResponse<T = any> {
        // 这里追加后台参数
        retCode: null,
        result: null
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

export class Request {
    public static axiosInstance: AxiosInstance;
    private static pendingRequests: PendingType[] = [];

    public static init() {
        // 创建axios实例
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }, 
            timeout: TIME_OUT,
        });
        this.initInterceptors();
        return axios
    }
 
    // 初始化拦截器
    public static initInterceptors() {
        this.axiosInstance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                this.abortPending(config);
                config.cancelToken = new axios.CancelToken((c) => {
                    this.pendingRequests.push({
                        url: config.url,
                        method: config.method,
                        cancel: c
                    })
                })

                // const token = localStorage.getItem('ACCESS_TOKEN');
                // if (token) {
                //     config.headers.Authorization = 'Bearer ' + token;
                // }

                return config;
            },
            (error: any) => {
                return Promise.reject(error)
            },
        );
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
                this.abortPending(response.config); 
                if (response.status === 200) {
                    const { retCode, message } = response.data || {};
                    if(retCode!= 200){
                        ElMessage.error(message);
                        if(INVALID_CODE.includes(retCode)){
                            // todo
                            // toLogin()
                        }
                    }
                    return response.data
                } else {
                    this.errorHandle(response);
                    return Promise.reject(response.data);
                }
            },
            (error: any) => {
                const { response } = error;
                if (response) {
                    // 请求已发出，但是不在2xx的范围，如104、500等
                    this.errorHandle(response);
                    return Promise.reject(response.data);
                } else {
                    // 取消请求
                    if(axios.isCancel(error)){
                        console.log('cancel axios')
                    }else{  
                        // 处理断网的情况
                        ElMessage.error('The network connection is abnormal. Please try again later!');
                    }
                }
            }
        );
    }
 
    // http握手错误
    private static errorHandle(res: any) {
        switch (res.status) {
            case 401:
                break;
            case 403:
                break;
            case 404:
                ElMessage.error('The requested resource does not exist');
                break;
            default:
                ElMessage.error('Connection error');
        }
    }

    // 移除重复请求
    private static abortPending(config: AxiosRequestConfig){
        for (const prs in this.pendingRequests) {
            const list:PendingType = this.pendingRequests[prs];
            if (!config || (list.url == config.url && list.method == config.method)) {
              // 执行取消操作 并把这条记录从数组中移除
              list.cancel();
              this.pendingRequests.splice(+prs, 1)
            }
        }
    }
 
}