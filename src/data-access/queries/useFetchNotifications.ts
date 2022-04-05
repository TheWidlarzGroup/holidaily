import { useQuery } from 'react-query'
import axios from 'axios'
import { Notification } from 'mock-api/models'
import { setItem, getItem } from 'utils/localStorage'
import { QueryKeys } from '../QueryKeys'
import { API } from '../API'

type FetchNotificationsResponse = {
  notifications: Notification[]
}

const fetchNotifications = async () => {
  // wee keep seen ids in the local storage to fake the real app experience. Remove it once we switch miragejs with real backend
  const seenNotificationsIds = JSON.parse((await getItem('seenNotificationsIds')) ?? '[]')
  if (seenNotificationsIds instanceof Array) {
    seenNotificationsIds.forEach(async (id) => {
      await axios.patch(API.PATCH.markNotificationAsSeen(id))
    })
  }
  const res = await axios.get<FetchNotificationsResponse>(API.GET.notifications)
  return res.data
}

export const useFetchNotifications = () =>
  useQuery([QueryKeys.NOTIFICATIONS], fetchNotifications, {
    onSuccess: (data) => {
      const { notifications } = data
      const seenNotificationsIds = notifications.filter((n) => n.wasSeenByHolder).map((n) => n.id)
      setItem('seenNotificationsIds', JSON.stringify(seenNotificationsIds))
    },
  })
