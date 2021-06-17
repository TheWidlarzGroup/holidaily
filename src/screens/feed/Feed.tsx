import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { mkUseStyles, Theme } from 'utils/theme'
import { FeedPost } from './components/FeedPost/FeedPost'
import { FeedPost as FeedPostType } from './types'

export const Feed = () => {
  const [posts] = useState<FeedPostType[]>(MOCK_POSTS)

  const renderPost = ({ item }: { item: FeedPostType }) => <FeedPost post={item} />

  return (
    <SafeAreaView>
      <FlatList data={posts} renderItem={renderPost} keyExtractor={({ meta }) => meta.id} />
    </SafeAreaView>
  )
}

// const useStyles = mkUseStyles((theme: Theme) => ({}))

const MOCK_POSTS: FeedPostType[] = [
  {
    meta: {
      id: '1',
      author: {
        id: '1',
        firstName: 'Joe',
        lastName: 'Doe',
      },
      timestamp: {
        createdAt: new Date(),
        editedAt: new Date(),
      },
    },
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit.',
    data: [
      {
        type: 'image',
        src:
          'https://images.unsplash.com/photo-1617731653770-a62c51cf8696?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        type: 'image',
        src:
          'https://images.unsplash.com/photo-1623764802787-eea7b530c90a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
    reactions: [],
    comments: [],
  },
]
