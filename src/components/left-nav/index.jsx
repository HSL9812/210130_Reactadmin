import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig.js'

import { Menu } from 'antd';
import {
  MailOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;


/* 
  左侧导航组件
 */
class LeftNav extends Component {
  /* 
    根据menu的数据数组生成对应的标签  
    使用map + 递归调用
  */
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return menuList.map(item => {
      /*
        {
          title: '首页',  // 菜单标题名称
          key:  '/home', // 对应的path 
          icon: 'home',  // 图标名称
          children: []   // 可能有， 也可能没有
        } 
      */
      if(!item.children) {
        return (
          <Menu.Item key={item.key} icon={<MailOutlined />}>
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        )
      } else {

        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => cItem.key === path)
        // 如果存在， 说明当前item的字列表需要打开
        if (cItem) {
          this.openKey = item.key
        }
        return (
          <SubMenu 
            key={item.key} 
            title={item.title}
            icon={<MailOutlined />}
          >
            {this.getMenuNodes(item.children)}
            
          </SubMenu>
        )
      }
    })
  }

  /* 
    在第一次render()之前执行一次
    为第一个render(准备数据(必须是同步的)
   */
  UNSAFE_componentWillMount() {
    this.memuNodes = this.getMenuNodes(menuList)
  }

  render() {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname
    console.log('render()', path)
    // 得到需要打开菜单项的路径
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt=""/>
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {this.memuNodes}
        </Menu>   
      </div>
    )
  }
}

/* 
widthRouter高阶组件:
 包装非路由组件，返回一个新的组件
 新的组件向非路由组件传递三个属性: history/location/match
 */
export default withRouter(LeftNav)
