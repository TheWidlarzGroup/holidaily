import { approveRequestMutation } from 'graphqlActions/mutations/approveRequestMutation'
import { rejectRequestMutation } from 'graphqlActions/mutations/rejectRequestMutation'
import { useMutation } from 'react-query'

import { ErrorTypes } from 'types/useLoginTypes'

export const useRequestActions = () => {
  const {
    mutate: approveRequest,
    isLoading: isLoadingApprove,
    isSuccess: isSuccessApprove,
  } = useMutation<{ approveRequest: { id: string; status: string } }, ErrorTypes, string>(
    approveRequestMutation,
    {
      onError: (error: ErrorTypes) => {
        console.warn(error)
      },
    }
  )

  const {
    mutate: rejectRequest,
    isLoading: isLoadingReject,
    isSuccess: isSuccessReject,
  } = useMutation<{ rejectRequest: { id: string; status: string } }, ErrorTypes, string>(
    rejectRequestMutation,
    {
      onError: (error: ErrorTypes) => {
        console.warn(error)
      },
    }
  )

  return {
    approveRequest,
    isLoadingApprove,
    isSuccessApprove,
    rejectRequest,
    isLoadingReject,
    isSuccessReject,
  }
}
