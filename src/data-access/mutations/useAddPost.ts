import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { API } from '../API'

const addPost = async (body: FeedPost): Promise<any> => {
  const { data } = await axios.post<FeedPost>(API.POST.addPost, body)
  return data
}
export const useAddPost = () =>
  useMutation<FeedPost, AxiosError<{ errors: string[] }>, FeedPost>(addPost, {
    onSuccess: (payload) => {
      console.log('success', payload)
    },
    onError: (err) => {
      console.log('Error while adding post: ', err.message)
    },
  })
