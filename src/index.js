/* 
 入口js
 */
import React from 'react'
import ReactDOM from 'react-dom'
// 配置了按需样式加载就不需要引入所有样式
// 全局引入antd的样式文件
// import 'antd/dist/antd.css'

import App from './app'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// 读取local中保存的user，保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

// 将APP组件标签渲染到index页面的div上
ReactDOM.render(
  <App />,
  document.getElementById('root')
)