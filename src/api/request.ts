import axios from 'axios';
import { useStore } from '@/stores';
import router from '@/router';
import { storeToRefs } from 'pinia';
import MessagePlugin from '@/plugins/MessagePlugin';

const stores = useStore();

// const { loading } = storeToRefs(stores)
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
  timeout: 20000
});

server.interceptors.request.use(
  (config) => {
    // 设置请求头
    if (window.__POWERED_BY_QIANKUN__) {
      // const masterProps = useModel('@@qiankunStateFromMaster');
      // config.headers.token = masterProps?.token;
      config.headers.token = localStorage.getItem('token');
    } else {
      config.headers.token = localStorage.getItem('token');
    }

    // config.headers['token'] = JSON.parse(localStorage.getItem('user'))?.uid || null;
    console.log('总req', config);
    if (!config?.noToast) setLoading({ show: true, handle: true });
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
    setLoading({ show: false });
    console.log('总res', res);
    if (res.state !== 200) {
      if (res.state === 401) {
        console.log('router', router);
        router.push('/login');
      }
      MessagePlugin({ title: '接口信息报错', icon: 'close' });
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (err) => {
    setLoading({ show: false });
    if (err.message.includes('timeout')) {
      MessagePlugin({ title: '网络超时', icon: 'close' });
    }
    if (err.message.includes('Network Error')) {
      MessagePlugin({ title: '服务端未启动，或网络连接错误', icon: 'close' });
    }
    return Promise.reject(err);
  }
);

export default server;
