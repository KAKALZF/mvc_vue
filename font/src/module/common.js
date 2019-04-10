import axios from 'axios';
import { mytips } from '@/module/tools';

axios.interceptors.response.use(
    res => {
        if(res.data.code > 0){
            console.log("返回的响应code>0")
            mytips(res.data.message);
        }else if(res.data.code < 0){
            console.log("返回的响应code<0")
            mytips('系统异常')
        }
        return res;
    },
    error => {
        mytips('连接异常');
        return Promise.reject(error);
    }
);
