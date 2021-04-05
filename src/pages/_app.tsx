import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect } from 'react'
import { pageview } from 'src/utils/google-analytics'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import { createGlobalStyle } from 'styled-components'
import 'normalize.css'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    font-size: 14px;
    font-family: -apple-system, 'Noto Sans KR', BlinkMacSystemFont, Roboto,
      'Helvetica Neue', sans-serif;
    line-height: normal;
    word-break: keep-all;

    @media (min-width: ${TABLET_MIN_WIDTH}) {
      font-size: 16px;
    }
  }

  ul, ol {
    padding: 0;
    list-style: none;
  }

  li {
    list-style-type: none
  }
`

// 최대 120자
const description =
  'Deple: Dessert Pleasure. 디플은 좋아하는 디저트를 보다 더 쉽게 고를 수 있는 온라인 디저트 전문 서비스입니다.'

// 최대 10개
const keywords = '디플,deple,디저트,플레저,배달,배송,픽업,예약'

function CapstoneApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Google Analytics로 정보 보내기
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const handleRouteChange = (url: string) => pageview(url)
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/sindy.jpeg" />
        <meta property="og:url" content="https://disin.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Deple: Dessert Pleasure" />
        <link rel="canonical" href="https://disin.vercel.app/" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default CapstoneApp
