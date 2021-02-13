import createAxios from './createAxios';

const serverAxios = (ctx) => createAxios({
  baseURL: 'http://localhost:7001',
}, ctx);

const clientAxios = createAxios({
  baseURL: '/',
});

export {
  clientAxios,
  serverAxios,
};
