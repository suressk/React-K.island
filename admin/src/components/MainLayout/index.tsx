import React, { memo } from 'react'
import Aside from '../Aside'
import styles from './index.module.scss'

interface IMainLayoutProps {
  children: JSX.Element;
}

const Index: React.FC<IMainLayoutProps> = (props) => {
  const { children } = props
  return (
    <div className={`flex ${styles.layout}`}>
      <div className={styles.layout_aside}>
        <Aside />
      </div>

      <div className={styles.layout_main}>
        {children}
      </div>
    </div>
  )
}

export default memo(Index)
