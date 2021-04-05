import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { canonicalUrl } from 'src/pages/_document'

type Props = {
  children: ReactNode
  title?: string
  description?: string // 최대 120자
}

function PageHead({
  children,
  title = 'Deple: Dessert Pleasure',
  description = '디플은 좋아하는 디저트를 보다 더 쉽게 고를 수 있는 온라인 디저트 전문 서비스입니다.',
}: Props) {
  const { pathname } = useRouter()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/sindy.jpeg" />
        <meta property="og:url" content={`${canonicalUrl}${pathname.slice(1)}`} />
        <meta property="og:site_name" content="Deple: Dessert Pleasure" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Sindy Logo" />
      </Head>
      {children}
    </>
  )
}

export default PageHead
