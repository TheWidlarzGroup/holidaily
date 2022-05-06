import { LoadingModal } from 'components/LoadingModal'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useGetPostsData } from 'dataAccess/queries/useFeedPostsData'
import { useLanguage } from 'hooks/useLanguage'
import { BottomTabNavigationProps } from 'navigation/types'
import React, { useEffect, useRef } from 'react'
import { FlatList } from 'react-native'
import { Box } from 'utils/theme'
import { FeedHeader } from './components/FeedHeader/FeedHeader'
import { FeedPost } from './components/FeedPost/FeedPost'

export const Feed = ({ route: { params: p } }: BottomTabNavigationProps<'Feed'>) => {
  const [language] = useLanguage()
  const { data } = useGetPostsData()
  const flatListRef = useRef<FlatList | null>(null)

  useEffect(() => {
    if (p.postId && data) {
      console.log(
        data.map((d) => d.meta.id),
        p.postId
      )
      const index = data?.findIndex((post) => String(post.meta.id) === String(p.postId))
      if (index && index >= 0) flatListRef.current?.scrollToIndex({ index, animated: true })
    }
  }, [data, p.postId])

  if (!data) return <LoadingModal show />

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <Box marginHorizontal="s" marginTop="m">
        <FlatList
          ref={flatListRef}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={<FeedHeader />}
          data={data}
          renderItem={({ item }) => <FeedPost post={item} />}
          keyExtractor={({ meta }) => meta.id}
          extraData={language}
          contentContainerStyle={{ paddingBottom: 70 }}
        />
      </Box>
    </SafeAreaWrapper>
  )
}
