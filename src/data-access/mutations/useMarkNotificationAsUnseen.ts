import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { Notification } from 'mockApi/models'
import { API } from '../API'
import { queryClient } from '../queryClient'
import { QueryKeys } from '../QueryKeys'

export type MarkUnseenResponse = { notification: Notification }

const markNotificationAsUnseen = async (id: string): Promise<MarkUnseenResponse> => {
  const { data } = await axios.patch<MarkUnseenResponse>(API.PATCH.markNotificationAsUnseen(id))
  return data
}
export const useMarkNotificationAsUnseen = () =>
  useMutation<MarkUnseenResponse, AxiosError<{ errors: string[] }>, string>(
    markNotificationAsUnseen,
    {
      onSuccess: (payload) => {
        queryClient.setQueryData([QueryKeys.NOTIFICATIONS], (data: any) => {
          payload.notification.wasSeenByHolder = false

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
