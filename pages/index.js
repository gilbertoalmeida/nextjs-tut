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
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Fala, parça!</p>
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
        <h2 className={utilStyles.headingLg}>Fact of the day:</h2>
        <p>{fact.text}</p>

      </section>
    </Layout>
  )
}