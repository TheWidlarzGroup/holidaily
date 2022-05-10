import { useNavigation } from '@react-navigation/native'
import { LoadingModal } from 'components/LoadingModal'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useGetPostsData } from 'dataAccess/queries/useFeedPostsData'
import { useLanguage } from 'hooks/useLanguage'
import { BottomTabNavigationProps } from 'navigation/types'
import React, { useCallback, useEffect, useRef } from 'react'
import { FlatList } from 'react-native'
import { Box } from 'utils/theme'
import { FeedHeader } from './components/FeedHeader/FeedHeader'
import { FeedPost } from './components/FeedPost/FeedPost'

const MAX_SCROLL_RETRIES = 4

export const Feed = ({ route: { params: p } }: BottomTabNavigationProps<'Feed'>) => {
  const [language] = useLanguage()
  const { data } = useGetPostsData()
  const navigation = useNavigation()

  const flatListRef = useRef<FlatList | null>(null)
  const scrollRetries = useRef(0)
  const scrollToId = useCallback(() => {
    if (
      flatListRef.current &&
      p?.postId &&
      !!data?.length &&
      scrollRetries.current <= MAX_SCROLL_RETRIES
    ) {
      const index = data.findIndex((post) => String(post.meta.id) === String(p.postId))
      if (index && index >= 0 && index < data.length) {
        flatListRef.current.scrollToIndex({ index, animated: true })
        scrollRetries.current++
      }
    }
  }, [p?.postId, data])

  useEffect(() => {
    scrollToId()
  }, [scrollToId])

  useEffect(() => {
    const removeListener = navigation.addListener('blur', () => {
      scrollRetries.current = 0
      navigation.setParams({ postId: undefined })
    })
    return removeListener
  }, [navigation])

  if (!data) return <LoadingModal show />

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <Box marginHorizontal="s" marginTop="m">
        <FlatList
          ref={flatListRef}
          keyboardShouldPersistTaps="handled"
          onScrollToIndexFailed={() => {
            setTimeout(scrollToId, 100)
          }}
          ListHeaderComponent={<FeedHeader />}
          data={data}
          renderItem={({ item }) => <FeedPost post={item} />}
          keyExtractor={({ meta }) => meta.id}
          extraData={language}
          contentContainerStyle={{ paddingBottom: 90 }}
        />
      </Box>
    </SafeAreaWrapper>
  )
}
