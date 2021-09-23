import React, { memo } from "react";
import styles from './index.module.scss'

interface IAsideProps {

}

const Index: React.FC<IAsideProps> = () => {

  return (
    <aside className={styles.aside}>
      Aside
    </aside>
  )
}

export default memo(Index)