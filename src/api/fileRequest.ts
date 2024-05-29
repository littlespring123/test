import axios from 'axios';
import { useStore } from '@/stores';
import { useRouter } from 'vue-router';
import MessagePlugin from '@/plugins/MessagePlugin';
const router = useRouter();
const stores = useStore();

const { setLoading } = stores;
interface requestType {
  data?: any;
  method?: string;
}

interface responseType {
  data?: any;
  message?: string;
  state?: number;
}

const server = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  // baseURL: "http://127.0.0.1:8080",
  timeout: 200000
});

server.interceptors.request.use(
  (config) => {
    console.log('总req', config);
    if (!config?.noToast) loading.value = true;
    // config.headers['token'] = JSON.parse(localStorage.getItem('user') || '')?.token;
    return config;
  },
  (err) => {
    console.log(err); // for debug
    return Promise.reject(err);
  }
);

server.interceptors.response.use(
  (response) => {
    const res: responseType = response.data;
    setLoading({ show: true, hanlde: true });
    console.dir('总res', res);
    if (res.state !== 200) {
      if (res.state === 401) {
        router.push('/login');
      }
      return Promise.reject(new Error(res.message || 'Error'));
    }
    setLoading({ show: false });
    return res;
  },
  (err) => {
    setLoading({ show: false });
    if (err.message.includes('timeout')) {
      MessagePlugin({ show: true, title: '网络超时', text: err.message, icon: 'close' });
    }
    if (err.message.includes('Network Error')) {
      MessagePlugin({
        show: true,
        title: '服务端未启动，或网络连接错误',
        text: err.message,
        icon: 'close'
      });
    }
    return Promise.reject(err);
  }
);

export default server;
