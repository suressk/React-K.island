import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App'
import './common/styles/initial.scss'
import './common/styles/variable.scss'
import './common/styles/common.scss'

const MOUNT_NODE = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  MOUNT_NODE
)
