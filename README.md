ROBOT
========

[![NPM version](http://img.shields.io/npm/v/robot.svg)](https://npmjs.org/package/robot)
[![Build Status](https://travis-ci.org/ygm125/robot.svg?branch=master)](https://travis-ci.org/ygm125/robot)

## What

一个基于 Koa 2.0 的 MVC 框架

## Why

基于 Koa 是因为它提供了一个极小的核心的 Node http 服务，同时基于中间件方式很方便扩展，
但是 Koa 当一个框架用还远远不够，需要自己开发或用第三方的中间件来组装自己的应用，
第三方中间件很多质量参差不齐、更新缓慢，所以催生了 Robot，整合了常用中间件，
以达到迅速使用 Koa 开发自己的应用目的

## How

独立安装框架 `npm install -S robot-frame`

或安装脚手架工具 `npm install -g robot-cli`

脚手架可以帮你自动生成项目目录结构 ==》`robot -c mode -d path`

mode 指生成的项目类型，选值 common、vue、react

path 指项目生成到的目录

[robot-cli 详细说明](https://github.com/ygm125/robot-cli)

## More

demo 目录为演示的常规项目，可执行 `npm run demo` 配合下面的说明加深使用理解

- 框架常规目录结构

    - www 传统的 MVC 目录（Controller,Model,View）
    - static 静态资源目录
    - index.js 为入口文件
    - routers.js 配置路由
    - config.js 配置文件

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

- 关于模块依赖

    - `***** 依赖中间件 *******`
    - koa-favicon
    - koa-bodyparser
    - koa-response-time
    - koa-router
    - `***** 依赖模块 *******`
    - bluebird
    - nunjucks
    - csrf
    - koa-send

## Other

有任何问题可与我联系~


