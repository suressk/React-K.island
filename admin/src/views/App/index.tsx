import React, { useState, useEffect } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import '@utils/i18n'
// import 'antd/dist/antd.css'
import MainLayout from '@/components/MainLayout'
import Aside from '@/components/Aside'
import Login from '../Login'

const whiteList = ['/login']

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {

  }, [])

  return (
    <ConfigProvider locale={zhCN}>
      {/* <MainLayout aside={<Aside />} main={<main />} /> */}
      {/* <Login /> */}
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={MainLayout} />
        </Switch>
      </Router>
    </ConfigProvider>
  )
}

export default App
