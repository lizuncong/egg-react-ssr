# egg-react-ssr

采用egg+mysql+sequelize+react+redux+redux-thunk+antd搭建的服务端渲染框架。运行本项目需要mysql相关环境。由于本项目包含较多工程化代码，同时需要mysql环境，不适合刚入门或者需要了解服务端渲染原理的同学。如果只需要学习react 服务端渲染原理，可以看这个项目[https://github.com/lizuncong/egg-react-ssr-demo](https://github.com/lizuncong/egg-react-ssr-demo)

### Development

本地开发环境需要**同时**启动egg服务以及react开发服务。遵循以下步骤：

- 1.首先安装依赖

```bash
$ npm i
```

- 2.启动egg服务

```bash
$ npm run dev
```
- 3.启动react开发服务

```bash
$ npm run dev-react
```

### Deploy
部署遵循以下步骤：

- 1.打包构建react

```bash
$ npm run build-react
```

- 2.启动egg服务：

```bash
$ npm start
```

如果需要停止服务，则运行：

```bash
$ npm stop
```

### npm scripts
下面这些命令都是egg脚手架自带的命令

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
