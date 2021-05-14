import { ApolloError } from '@apollo/client'
import { toast } from 'react-toastify'

export function handleApolloError(error: ApolloError) {
  toast.warn(error.message)
}
