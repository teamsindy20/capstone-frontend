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
