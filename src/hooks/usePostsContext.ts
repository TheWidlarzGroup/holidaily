import { useContext } from 'react'
import { PostsContext } from 'contexts/PostsContext'

export const usePostsContext = () => {
  const context = useContext(PostsContext)

  if (context) {
    return context
  }

  throw Error('Use this hook in PostsProvider scope')
}
