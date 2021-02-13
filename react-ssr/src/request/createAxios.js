import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

// 服务端创建axios实例时需要带上ctx，
const createAxios = (options, ctx) => {
  const { baseURL } = options;
  const headers = {};
  const isServer = !!ctx;
  // 服务端请求需要带上cookie
  if (isServer) {
    headers.cookie = ctx.request.get('cookie') || ''; // 必须要携带浏览器带过来的cookie，不然egg服务接收不到cookie
  }
  const instance = axios.create({
    baseURL,
    headers,
    timeout: 10000,
  });
  // 请求拦截
  instance.interceptors.request.use((config) => config);
  // 响应拦截
  instance.interceptors.response.use(
    (response) => {
      const res = response.data;
      if (Number(res.code) !== 0) {
        if (!isServer) {
          message.error(res.message || '出错了');
        }
        return Promise.resolve(null);
      }
      return Promise.resolve(res);
    },
    (error) => {
      if (!isServer) {
        message.error(`error:${error.message}`);
      }
      return Promise.resolve(null);
    },
  );

  // 请求方法封装
  const request = (method, url, data, ...rest) => new Promise((resolve) => {
    const config = { method, url, ...rest };

    if (method === 'get') {
      config.params = data;
    } else if (method === 'post') {
      config.data = data;
    }
    instance(config).then((res) => {
      resolve(res);
    }).catch(() => {
      resolve(null);
    });
  });

  instance.get = (url, data) => request('get', url, data);
  instance.post = (url, data) => request('post', url, data);
  instance.postForm = (url, data = {}) => {
    const header = { 'content-type': 'application/x-www-form-urlencoded' };
    return this.request('post', options.url, qs.stringify(data), { headers: header });
  };
  return instance;
};

export default createAxios;
