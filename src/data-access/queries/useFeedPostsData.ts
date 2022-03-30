import { useQuery } from 'react-query'
import axios from 'axios'
import { QueryKeys } from 'dataAccess/QueryKeys'
import { API } from 'dataAccess/API'
import { FeedPost } from 'mockApi/models/miragePostTypes'

export const getPostsData = async () => {
  const response = await axios.get(API.GET.getPosts)
  return response.data
}

export const useGetPostsData = () => useQuery<FeedPost[]>(QueryKeys.POSTS, getPostsData)
