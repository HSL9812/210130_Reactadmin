import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'

/*
应用的根组件 
 */
export default class App extends Component {
  render() {
    return (
      /* BrowserRouter和HashRouter  区别是HashRouter地址后面会多个# */
      <BrowserRouter>
        <Switch>{/* 只匹配其中一个 */}
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
