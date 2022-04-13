import { useQuery } from 'react-query'
import axios from 'axios'
import { User } from 'mock-api/models'
import { QueryKeys } from '../QueryKeys'
import { API } from '../API'

const fetchUser = async (id: string) => {
  const res = await axios.get<{ user: User }>(API.GET.user(id))
  return res.data
}

export const useFetchUserData = (userId: string) =>
  useQuery([QueryKeys.USER], () => fetchUser(userId))

const fetchAllUsers = async () => {
  const res = await axios.get(API.GET.allUsers)
  return res.data
}

export const useFetchAllUsers = () => useQuery<User[]>([QueryKeys.ALL_USERS], () => fetchAllUsers())
