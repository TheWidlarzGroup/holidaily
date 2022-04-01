import { useGetPostsData } from 'dataAccess/queries/useFeedPostsData'
import { useLanguage } from 'hooks/useLanguage'
import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box } from 'utils/theme'
import { FeedHeader } from './components/FeedHeader/FeedHeader'
import { FeedPost } from './components/FeedPost/FeedPost'
// import { posts as miragePosts } from 'mockApi/factories/posts'

export const Feed = () => {
  const [language] = useLanguage()
  const { data } = useGetPostsData()

  if (!data) return null

  return (
    <SafeAreaView>
      <Box marginHorizontal="s">
        <FlatList
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={<FeedHeader />}
          data={data}
          renderItem={({ item }) => <FeedPost post={item} />}
          keyExtractor={({ meta }) => meta.timestamp.createdAt.toString()}
          extraData={language}
        />
      </Box>
    </SafeAreaView>
  )
}
