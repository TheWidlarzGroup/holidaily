import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { Notification } from 'mockApi/models'
import { API } from '../API'
import { queryClient } from '../queryClient'
import { QueryKeys } from '../QueryKeys'

export type MarkSeenResponse = { notification: Notification }

type MarkNotificationAsSeenParams = {
  id: string
  markAsUnseen?: boolean
}

const markNotificationAsSeen = async (
  params: MarkNotificationAsSeenParams
): Promise<MarkSeenResponse> => {
  const url = params.markAsUnseen
    ? API.PATCH.markNotificationAsUnseen(params.id)
    : API.PATCH.markNotificationAsSeen(params.id)
  const { data } = await axios.patch<MarkSeenResponse>(url)
  return data
}

export const useMarkNotificationAsSeen = () =>
  useMutation<MarkSeenResponse, AxiosError<{ errors: string[] }>, MarkNotificationAsSeenParams>(
    markNotificationAsSeen,
    {
      onSuccess: (payload) => {
        queryClient.setQueryData([QueryKeys.NOTIFICATIONS], (data: any) => {
          if (!data?.notifications || !(data.notifications instanceof Array))
            return { notifications: [payload.notification] }

          const previousNotifications = data.notifications.filter(
            (n: Notification) => n.id !== payload.notification.id
          )

          return { notifications: [payload.notification, ...previousNotifications] }
        })
      },
      onError: (err) => {
        console.log('Error while updating notification: ', err.message)
      },
    }
  )
