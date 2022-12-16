import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { TIMEOUT } from './config';
import { ElMessage } from 'element-plus'
import useCounterStore from '@/stores/user';


// 取消重复请求
interface IPendingType {
    url?: string,
    cancel: Function;
}
const pending: Array<IPendingType> = [];
const CancelToken = axios.CancelToken;
const fixUrl = (conf: any) => {
    const { method, url } = conf
    const _url = method + '@' + url
    return _url
}
const removePending = (config?: AxiosRequestConfig, manualCancel?: string) => {
    for (const key in pending) {
        const item: number = +key;
        const list: IPendingType = pending[key];
        if ((!config && !manualCancel) || list.url === fixUrl(config) || list.url === manualCancel) {
            // 执行取消操作 并把这条记录从数组中移除
            list.cancel();
            pending.splice(item, 1);
        }
    }
};
/**
 * permission.js文件内调用, 作用于路由跳转之前
 * 参数request: manual Cancel; 手动取消的传参, eg: 'get@/sys/user/myinfo'
 */
export const abort = (request?: string) => {
    if (!request) {
        removePending()
    } else {
        removePending({}, request)
    }
}



// http握手错误
const errorHandle = (status: number) => {
    switch (status) {
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


// axios 实例
const instance: AxiosInstance = axios.create({
    timeout: TIMEOUT,
    responseType: 'json'
});
// 不需要token可访问的api
const urlList = ['/sys/login', '/logout']
// 添加请求拦截器
instance.interceptors.request.use(
    (config: any) => {
        removePending(config);
        config.cancelToken = new CancelToken((c) => {
            pending.push({ url: fixUrl(config), cancel: c });
        });

        const token = useCounterStore().token
        const url = config.url
        if (token && !(urlList.includes(url))) {
          config.url = `${url}?JSESSIONID=${token}`
        }

        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);
// 添加响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        removePending(response.config);
        return response;
    },
    (error: any) => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围，如104、500等
            errorHandle(response.status);
            return Promise.reject(response.data);
        } else {
            // 取消请求
            if(axios.isCancel(error)){
                return Promise.reject('cancel axios');
            }else{  
                // 处理断网的情况
                ElMessage.error('The network connection is abnormal. Please try again later!');
                return Promise.reject('The network connection is abnormal');
            }
        }
    }
);


export default instance