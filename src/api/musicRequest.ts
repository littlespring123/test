import axios from 'axios';
import { useStore } from '@/stores';
import MessagePlugin from '@/plugins/MessagePlugin';
const stores = useStore();

const { setLoading } = stores;
interface requestType {
  data?: any;
  method?: string;
}

interface responseType {
  result?: any;
  message?: string;
  code?: number;
}

const server = axios.create({
  baseURL: 'https://121.41.112.199/music',
  timeout: 20000
});

server.interceptors.request.use(
  (config) => {
    console.log('req', config);
    setLoading({ show: true, handle: true });
    // config.headers['token'] = JSON.parse(localStorage.getItem('user') || '')?.token;
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

server.interceptors.response.use(
  (response) => {
    const res: responseType = response.data;
    setLoading({ show: false });
    console.log('总res', res);
    if (res.code !== 200) {
      MessagePlugin({ title: '接口信息报错', text: res.message, icon: 'close' });
      return Promise.reject(new Error(res.message || 'Error'));
    }
    setLoading({ show: false });
    return res;
  },
  (err) => {
    setLoading({ show: false });
    if (err.message.includes('timeout')) {
      MessagePlugin({ title: '网络超时', text: err.message, icon: 'close' });
    }
    if (err.message.includes('Network Error')) {
      MessagePlugin({ title: '服务端未启动，或网络连接错误', text: err.message, icon: 'close' });
    }
    return Promise.reject(err);
  }
);

export default server;
