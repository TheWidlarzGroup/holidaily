import { useQuery } from 'react-query'
import axios from 'axios'
import { Notification } from 'mock-api/models'
import { QueryKeys } from '../QueryKeys'
import { API } from '../API'

type FetchNotificationsResponse = {
  notifications: Notification[]
}

const fetchNotifications = async () => {
  const res = await axios.get<FetchNotificationsResponse>(API.GET.notifications)
  return res.data
}

export const useFetchNotifications = () => useQuery([QueryKeys.NOTIFICATIONS], fetchNotifications)
