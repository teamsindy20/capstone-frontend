import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { createContext, ReactNode, useEffect, useMemo } from 'react'
import { client } from 'src/apollo/client'
import { MeQuery, useMeQuery } from 'src/graphql/generated/types-and-hooks'
import { CHOCO_COLOR, DARK_CHOCO_COLOR, TABLET_MIN_WIDTH } from 'src/models/constants'
import { pageview } from 'src/utils/google-analytics'
import styled, { createGlobalStyle } from 'styled-components'
import 'normalize.css'
import 'antd/dist/antd.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'animate.css/animate.min.css'
import { ToastContainer, cssTransition } from 'react-toastify'

export const fade = cssTransition({
  enter: 'animate__animated animate__fadeIn',
  exit: 'animate__animated animate__fadeOut',
})

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    color: ${DARK_CHOCO_COLOR};
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans KR', 'Roboto',
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

  a {
    color: ${DARK_CHOCO_COLOR};
    text-decoration: none;
    transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    :hover {
      color: ${CHOCO_COLOR}
    }
  }
`

type GlobalContextValues = {
  user?: MeQuery['me']
  loading: boolean
  refetchUser: () => Promise<unknown>
}

export const GlobalContext = createContext<GlobalContextValues>({
  loading: false,
  refetchUser: async () => null,
})

type GlobalProviderProps = {
  children: ReactNode
}

function GlobalProvider({ children }: GlobalProviderProps) {
  const { data, error, networkStatus, refetch } = useMeQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })

  const user = error ? null : data?.me

  const value = {
    ...(user && { user }),
    loading: networkStatus < 7,
    refetchUser: refetch,
  }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

const MaxWidth = styled.div`
  max-width: ${TABLET_MIN_WIDTH};
  margin: 0 auto;
`

function DessertFitApp({ Component, pageProps }: AppProps) {
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
      </Head>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <GlobalProvider>
          <main style={{ maxWidth: TABLET_MIN_WIDTH, margin: '0 auto' }}>
            <Component {...pageProps} />
          </main>
        </GlobalProvider>
      </ApolloProvider>
      <ToastContainer autoClose={3000} hideProgressBar position="top-center" transition={fade} />
    </>
  )
}

export default DessertFitApp
