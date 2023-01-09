import { useContext } from 'react'
import { CreatePostContext } from 'contexts/CreatePostContext'

export const useCreatePostContext = () => {
  const context = useContext(CreatePostContext)

  if (context) {
    return context
  }

  throw Error('Use this hook in CreatePostProvider scope')
}
