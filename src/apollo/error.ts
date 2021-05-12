import { ApolloError } from '@apollo/client'
import { ToastContainer, toast } from 'react-toastify'

export function handleApolloError(error: ApolloError) {
  toast(error.message)
}
