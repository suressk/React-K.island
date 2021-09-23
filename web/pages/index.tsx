import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>K.island</title>
        <meta name="description" content="K.island, Next Web Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        K.island Next Application
      </main>

      <footer className={styles.footer}>
        Powered by K.
      </footer>
    </div>
  )
}

export default Home
