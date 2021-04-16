import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { createContext, ReactNode, useEffect, useMemo } from 'react'
import { client } from 'src/apollo/client'
import { handleApolloError } from 'src/apollo/error'
import { MeQuery, useMeQuery } from 'src/graphql/generated/types-and-hooks'
import { CHOCO_COLOR, DARK_CHOCO_COLOR, TABLET_MIN_WIDTH } from 'src/models/constants'
import { pageview } from 'src/utils/google-analytics'
import { createGlobalStyle } from 'styled-components'
import 'normalize.css'
import 'antd/dist/antd.css'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    color: ${DARK_CHOCO_COLOR};
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

  a {
    color: ${DARK_CHOCO_COLOR};
    text-decoration: none;
    transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    :hover {
      color: ${CHOCO_COLOR}
    }
  }
`

type Values = {
  user: MeQuery['me']
  refetchUser: () => Promise<unknown>
}

export const GlobalContext = createContext<Values | undefined>(undefined)

type Props = {
  children: ReactNode
}

function GlobalProvider({ children }: Props) {
  const { data, refetch } = useMeQuery({ onError: handleApolloError })

  const user = data?.me

  const value = useMemo(
    () => ({
      user,
      refetchUser: refetch,
    }),
    [refetch, user]
  )

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

function DepleApp({ Component, pageProps }: AppProps) {
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
      <ApolloProvider client={client}>
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </ApolloProvider>
    </>
  )
}

export default DepleApp
