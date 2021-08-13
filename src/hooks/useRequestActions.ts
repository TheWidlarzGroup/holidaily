import { approveRequestMutation } from 'graphqlActions/mutations/approveRequestMutation'
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

  // TODO: change to reject mutation when backend is ready
  // const { mutate: rejectRequest, isLoading: isLoadingReject } = useMutation<
  //   { approveRequest: { id: string; status: string } },
  //   ErrorTypes,
  //   string
  // >(approveRequestMutation, {
  //   onSuccess: (data: { approveRequest: { id: string; status: string } }) => {
  //     console.log('Approve request mutation success', data.approveRequest)
  //   },
  //   onError: (error: ErrorTypes) => {
  //     console.warn(error)
  //   },
  // })

  return { approveRequest, isLoadingApprove, isSuccessApprove }
}
