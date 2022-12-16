type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
 
export interface IAxiosRequest {
    baseURL?: string;
    url: string;
    data?: any;
    params?: any;
    method?: Method;
    headers?: any;
    timeout?: number;
    responseType?: ResponseType;
}

export interface ICustomResponse {
    readonly retCode: number;
    readonly message: string | null;
    result: any;
    // list
    count?: number;
    pageReqVo?: any;
    show?: any;
    totalCount?: number;
    totalPage?: number
}