ROBOT
========

## What

一个基于 Koa 2.0 的 MVC 框架

## Why

基于 Koa 是因为它提供了一个极小的核心的 Node http 服务，同时基于中间件方式很方便扩展，
但是 Koa 当一个框架用还远远不够，需要自己开发或用第三方的中间件来组装自己的应用，
第三方中间件很多质量参差不齐、更新缓慢，所以催生了 Robot，精挑细选了些必用中间件，
同时内部处理维护了一些中间件，以达到迅速使用 Koa 开发自己的应用目的

## How

1、 安装脚手架工具 `npm install -g robot-cli`

2、 执行 `robot -d myapp` myapp 为项目名

3、 `cd myapp && npm install` 安装依赖

4、 开发模式：`npm run dev` 

生产模式：打包资源 `npm run build` ，启动 `npm run pro`

5、访问 `http://127.0.0.1:8080/`

## More

- 目录结构说明

    - www 传统的 MVC 目录（Controller,Model,View）
    - static 静态资源目录
    - index.js 为入口文件
    - routers.js 配置路由

- 如何使用 Robot 开发

    - 如项目示例 routers.js，配置路由 
        ```
        router.get( '/', reflectAction( 'home.index' ) )
        ```
        自动映射到 www/controller 的实例方法

    - 框架提供简单的辅助方法，如同步设置数据 
        ```
        this.assign( 'config',{ keys : 'xxx' })
        ```

        异步拉取数据
        ```
        this.assign( 'uinfo', ( done ) => {
            setTimeout(() => {
                done( {
                    name : 'ygm'
                } )
            }, 100 )
        })
        ```

        获取数据渲染
        ```
        return this.fetchData().then(( data ) => {
            ctx.render( 'home/index', data )
        })
        ```

        fetchData 自动拉取数据，render 自动加载 view 下模板进行渲染

    - 项目默认使用 DEBUG 模式，经常修改的文件会自动应用热更新

- 关于中间件

    Robot 加载了些中间件

    - koa-favicon
    - koa-bodyparser
    - koa-response-time
    - koa-router
    - `***** 以下为内部封装 *******`
    - nunjucks
    - csrf
    - koa-send

    内部封装主要因为现有中间件不符和更新缓慢

    对于模板比对了一些主流的最终选用了 nunjucks，选它的原因是支持模板继承，
    不打断原有语义，语法简洁，注册 helper 方便，支持浏览器与服务端，同时也在维护更新

- 静态资源

    静态资源采用 webpack 打包，模块化书写，开发模式资源自动更新，生产模式加载 MD5 版本

## Other

有任何问题可与我联系~


