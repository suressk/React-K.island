import React, { useState, useEffect } from 'react'
// import styles from './index.module.scss'
import MainLayout from '@/components/MainLayout'
import Aside from '@/components/Aside'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {

  }, [])

  return (
    <MainLayout aside={<Aside />} main={<main />} />
  )
}

export default App
