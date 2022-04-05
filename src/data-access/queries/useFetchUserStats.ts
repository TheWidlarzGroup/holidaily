import { useQuery } from 'react-query'
import axios from 'axios'
import { QueryKeys } from '../QueryKeys'
import { API } from '../API'

type Stats = {
  ptoTaken: `${number}`
  sickdaysTaken: `${number}`
}

const fetchUserStats = async () => {
  const res = await axios.get<Stats>(API.GET.userStats)
  return res.data
}

export const useFetchUserStats = () =>
  useQuery([QueryKeys.USER_STATS], fetchUserStats, {
    onError: (err: any) => {
      console.error(err)
      if (err?.response) console.error(err.response.data)
    },
  })
