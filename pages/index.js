// import { useState, useEffect } from "react"
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { fetchFact } from "../Utils/fetchFact"
import DatePretty from '../components/date'

export async function getServerSideProps() {
  const allPostsData = getSortedPostsData()
  const fact = await fetchFact()
  return {
    props: {
      allPostsData,
      fact
    }
  }
}

export default function Home({ allPostsData, fact }) {
  // const [fact, setfact] = useState({})

  // const fetchingFact = async () => {
  //   const newfact = await fetchFact()
  //   setfact(newfact)
  // }

  // useEffect(() => {
  //   fetchingFact()
  // }, [])


  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <h3>
          Read{" "}
          <Link href="posts/first-post">First post</Link>
        </h3>

      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <DatePretty dateString={date} />
              </small>
            </li>
          ))}
        </ul>
        <p>Joke of the day:</p>
        <p>{fact.text}</p>

      </section>
    </Layout>
  )
}