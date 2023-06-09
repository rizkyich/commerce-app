import Head from 'next/head'
import { GetServerSidePropsContext, GetStaticPathsContext, GetStaticPropsContext } from 'next'
import { Inter } from 'next/font/google'

import Layout from '@/components/layout/Layout'
import CatalogSection from '@/components/CatalogSection'

import { getCategoryList } from '@/services/category'
import { CategoryType } from '@/types/categoryTypes'
import { getProductList } from '@/services/products'
import { ProductType } from '@/types/productTypes'

const inter = Inter({ subsets: ['latin'] })

type CatalogPageProps = {
  categories: CategoryType[],
  categoryId: string,
}

export default function CatalogPage({
  categories,
  categoryId
}: CatalogPageProps) {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        categories={categories}
      >
        <CatalogSection
          categoryId={categoryId}
        />
      </Layout>
    </>
  )
}



export async function getStaticPaths() {
  try {
    const categories =  await getCategoryList();
    categories.sort((a, b) => b.name.length - a.name.length)

    const paths = categories.map((category: CategoryType) => ({
      params: { categoryId: category.id }
    }))

    return { paths, fallback: false }
  } catch (error) {
    console.error(error)
  } 
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const { params } = context

    const categories =  await getCategoryList();
    categories.sort((a, b) => b.name.length - a.name.length)

    return {
      props: {
        categories,
        categoryId: params?.categoryId
      }, 
    }
  } catch (error) {
    return {
      notFound: true
    }
  } 
}
