import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header.js'

export default function Home( ) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home Page" />
      </Head>

      <Header />
      <main className={styles.main}>
        This is the home page
      </main>
    </>
  )
}
