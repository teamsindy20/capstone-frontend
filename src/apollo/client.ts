import { ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import cache from './cache'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
})

// Authenticate using HTTP header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token') ?? localStorage.getItem('token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})
