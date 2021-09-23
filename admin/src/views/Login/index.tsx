import React, { memo } from "react";
import { useTranslation } from 'react-i18next'
import { Button, Input } from 'antd'
import styles from './index.module.scss'

interface ILoginProps {

}

// const LoginTitle: React.FC = () => {
//   return (<>
//   </>)
// }

/**
 * @description 登录✌️
 * @author Saul
 * @date 14/09/2021
 * @return {*} 
 */
const Index: React.FC<ILoginProps> = (): JSX.Element => {

  const { t } = useTranslation()

  return (
    <section className={`flex-center ${styles.login_wrapper}`}>
      <div className={styles.login_bg} />
      <div className={styles.login_bg} />
      <div className={styles.login_bg} />

      <main className={`flex-center ${styles.login_form_container}`}>
        <span className={styles.circle} />
        <span className={styles.circle} />
        <span className={styles.circle} />
        <span className={styles.circle} />
        <span className={styles.circle} />

        <form className={styles.login_form}>
          <div className={styles.login_form_item}>{t('login')}</div>
          <div className={styles.login_form_item}>
            <Input placeholder={t('login')} />
          </div>
          <div className={styles.login_form_item}>
            <Input placeholder={t('login')} type="password" autoComplete="false" />
          </div>
          <div className={styles.login_form_item}>
            <Button type="primary">{t('login')}</Button>
          </div>
        </form>
      </main>
    </section>
  )
}

export default memo(Index)