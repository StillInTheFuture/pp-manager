import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus'
import { BASE_URL, TIME_OUT } from './config';
 
export class Request {
    public static axiosInstance: AxiosInstance;
 
    public static init() {
        // 创建axios实例
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }, 
            timeout: TIME_OUT,
        });
        // 初始化拦截器
        this.initInterceptors();
        return axios;
    }
 
    // 初始化拦截器
    public static initInterceptors() {
        this.axiosInstance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
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
                if (response.status === 200) {
                    const { retCode, message } = response.data || {}
                    // todo
                    // ...
                    return response.data
                } else {
                    this.errorHandle(response);
                    return Promise.reject(response.data);
                }
            },
            (error: any) => {
                const { response } = error;
                if (response) {
                    // 请求已发出，但是不在2xx的范围
                    this.errorHandle(response);
                    return Promise.reject(response.data);
                } else {
                    // 处理断网的情况
                    ElMessage.error('The network connection is abnormal. Please try again later!');
                }
            }
        );
    }
 
    /**
     * http握手错误
     * @param res 响应回调,根据不同响应进行不同操作
     */
    private static errorHandle(res: any) {
        // 状态码判断
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
 
}