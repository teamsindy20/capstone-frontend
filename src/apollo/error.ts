import { ApolloError } from '@apollo/client'

export function handleApolloError(error: ApolloError) {
  console.warn(error.message)
}
