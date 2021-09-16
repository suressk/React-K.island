import React, { useState, useEffect } from 'react'
// import styles from './index.module.scss'
import Aside from '@/components/Aside'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {

  }, [])

  return (
    <div className="App">
      <Aside />
    </div>
  )
}

export default App
