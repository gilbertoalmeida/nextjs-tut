import Link from "next/link"
import Head from "next/head"
import Layout from "../../components/Layout"

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Link href="/">
        <a>
          Back to home
        </a>
      </Link>
      <h1>First Post</h1>

    </Layout>
  )
}