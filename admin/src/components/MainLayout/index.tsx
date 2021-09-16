import React, { memo } from 'react'
import styles from './index.module.scss'

interface IMainLayoutProps {
  aside: JSX.Element;
  main: JSX.Element;
}

const Index: React.FC<IMainLayoutProps> = (props) => {
  const { aside, main } = props
  return (
    <div className={`flex ${styles.layout}`}>
      <div className={styles.layout_aside}>
        {aside}
      </div>

      <div className={styles.layout_main}>
        {main}
      </div>
    </div>
  )
}

export default memo(Index)
