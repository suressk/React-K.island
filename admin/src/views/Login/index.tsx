import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input } from "antd";
import styles from "./index.module.scss";

import avatarImg from "@common/img/avatar.png";

interface ILoginProps {}

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
  const { t } = useTranslation();

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

        <form className={styles.login_form} autoComplete="off">
          <div className={`${styles.login_form_header} flex`}>
            <span className={`${styles.avatar} flex-center"`}>
              <img src={avatarImg} alt="author" />
            </span>
            <h1 className={`${styles.island}`}>K.island</h1>
            {/* {t("login")} */}
          </div>
          <div className={styles.login_form_item}>
            <input className={styles.login_form_input} required />
            <span className={styles.tip_label}>Username</span>
            <span className={styles.border_line} />
          </div>
          <div className={styles.login_form_item}>
            <input
              required
              className={styles.login_form_input}
              type="password"
              autoComplete="false"
            />
            <span className={styles.tip_label}>Password</span>
            <span className={styles.border_line} />
          </div>
          <div className={styles.login_form_item}>
            <Button type="primary">{t("login")}</Button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default memo(Index);
