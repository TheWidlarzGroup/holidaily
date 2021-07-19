import { useLanguage } from 'hooks/useLanguage'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box } from 'utils/theme'
import { FeedHeader } from './components/FeedHeader/FeedHeader'
import { FeedPost } from './components/FeedPost/FeedPost'
import { MOCK_POSTS } from './MOCK_POSTS'

export const Feed = () => {
  const [posts] = useState(MOCK_POSTS)
  const [language] = useLanguage()

  return (
    <SafeAreaView>
      <Box marginHorizontal="s">
        <FlatList
          ListHeaderComponent={<FeedHeader />}
          data={posts}
          renderItem={({ item }) => <FeedPost post={item} />}
          keyExtractor={({ meta }) => meta.id}
          extraData={language}
        />
      </Box>
    </SafeAreaView>
  )
}
