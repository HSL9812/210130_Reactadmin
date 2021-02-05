import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './login.less'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api/'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
/*
 登陆的路由组件 
 */
export default class Login extends Component {
  handleSubmit = async (value) => {
    // 参数value的值为我们的表单数据对象
    // console.log(value, '校验成功，发起Ajax请求获取数据')
    // 请求登陆
    const { username, password } = value
    // reqLogin(username, password).then(response => {
    //   console.log('成功了', response.data)
    // }).catch(error => {
    //   console.log('失败了', error)
    // })
    // 利用async和await优化promise代码
    const response = await reqLogin(username, password)
    const result = response // {status: 0, data: user} {status: 1, message: 'xxx'}
    if (result.status === 0) { // 登录成功
      // 提示登录成功
      message.success('登录成功!')
      console.log(result)

      // 保存user
      const user = result.data
      memoryUtils.user = user // 保存在内存中
      storageUtils.saveUser(user) // 保存到Local中

      // 跳转到管理页面 this.props.history下面的方法 
      // 常见的三个方法 push replace gaBack
      // 用的最多的就是push方法实现路由之间的跳转, replace与push的区别在于replace是替换，无法实现浏览器的后退功能， 不能返回到原先的页面
      // this.props.history.push('/')
      this.props.history.replace('/admin')

    } else { // 登录失败
      // 提示错误信息
      message.error(result.msg)
      console.log(result)
    }
  }
  handleFailed = (value) => {
    // 参数value的值是校验失败的对象
    // console.log(this, value
    message.info('请输入合适的用户名和密码!')
    console.log('校验失败')
  }  
  validatePwd = (rule, value) => {
    // 函数有三个参数， rule校验规则, value输入的值， 省略的callback回调函数
    // console.log('validatePwd()', rule, value)
    if (!value) {
      // callback('密码必须输入')
      return Promise.reject('密码必须输入')
    } else if (value.length < 4) {
      // callback('密码长度不能小于4位')
      return Promise.reject('密码长度不能小于4位')
    } else if (value.length > 12) {
      // callback('密码长度不能大于12位')
      return Promise.reject('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      // callback('密码必须是英文、数字或下划线组成')
      return Promise.reject('密码必须是英文、数字或下划线组成')
    } else {
      // callback() // 验证通过
      return Promise.resolve()
    }
  }
  render() {
    // 如果用户已经登录，自动跳转到管理界面
    const user = memoryUtils.user
    if(user && user._id) {
      return <Redirect to='/' />
    }


    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          
          <Form className="login-form" onFinish={this.handleSubmit}  onFinishFailed={this.handleFailed} initialValues={{'username': 'admin', 'password': 'admin'}}>
            <Form.Item
              name="username"
              rules={
                [
                  { required: true, message: '用户名必须输入' },
                  { min: 4, message: '用户名至少为4位' },
                  { max: 12, message: '用户名最多12位'},
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                ]
              }
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" style={{color: 'rgba(0, 0, 0,  .25)'}}/>} 
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ validator: this.validatePwd }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" style={{color: 'rgba(0, 0, 0,  .25)'}}/>}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

/* 
  1.前台表单验证
  2.收集表单输入数据
 */