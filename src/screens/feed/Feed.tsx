import { LoadingModal } from 'components/LoadingModal'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useGetPostsData } from 'dataAccess/queries/useFeedPostsData'
import { useLanguage } from 'hooks/useLanguage'
import React from 'react'
import { FlatList } from 'react-native'
import { Box } from 'utils/theme'
import { FeedHeader } from './components/FeedHeader/FeedHeader'
import { FeedPost } from './components/FeedPost/FeedPost'

export const Feed = () => {
  const [language] = useLanguage()
  const { data } = useGetPostsData()

  if (!data) return <LoadingModal show />

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <Box marginHorizontal="s" marginTop="m">
        <FlatList
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={<FeedHeader />}
          data={data}
          renderItem={({ item }) => <FeedPost post={item} />}
          keyExtractor={({ meta }) => meta.timestamp.createdAt.toString()}
          extraData={language}
          contentContainerStyle={{ paddingBottom: 70 }}
        />
      </Box>
    </SafeAreaWrapper>
  )
}
