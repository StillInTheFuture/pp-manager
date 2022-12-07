import { Request } from '@/services/request';
import qs from 'qs'
 
type loginData = {
    email: string,
    password: string
}
export function login (data: loginData)  {
    return Request.axiosInstance.post('/sys/login', qs.stringify(data))
}