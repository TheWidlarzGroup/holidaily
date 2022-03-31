import { useQuery } from 'react-query'
import axios from 'axios'
import { DayOffRequest } from 'mock-api/models'
import { QueryKeys } from '../QueryKeys'
import { API } from '../API'

const fetchUserRequests = async () => {
  const res = await axios.get<DayOffRequest[]>(API.GET.userRequests)
  return res.data
}

export const useFetchUserRequests = () => useQuery([QueryKeys.USER_REQUESTS], fetchUserRequests)
