import React, { useState, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import '@utils/i18n'
// import 'antd/dist/antd.css'
import MainLayout from '@/components/MainLayout'
import Aside from '@/components/Aside'
import Login from '../Login'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {

  }, [])

  return (
    <ConfigProvider locale={zhCN}>
      {/* <MainLayout aside={<Aside />} main={<main />} /> */}
      <Login />
    </ConfigProvider>
  )
}

export default App
