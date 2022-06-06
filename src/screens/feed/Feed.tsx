import { useNavigation } from '@react-navigation/native'
import { EditContextMenu } from 'components/EditContextMenu'
import { LoadingModal } from 'components/LoadingModal'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useGetPostsData } from 'dataAccess/queries/useFeedPostsData'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useBooleanState } from 'hooks/useBooleanState'
import { useLanguage } from 'hooks/useLanguage'
import { BottomTabNavigationProps } from 'navigation/types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, GestureResponderEvent } from 'react-native'
import { FeedHeader } from './components/FeedHeader/FeedHeader'
import { FeedPost } from './components/FeedPost/FeedPost'

const MAX_SCROLL_RETRIES = 4

export const Feed = ({ route: { params: p } }: BottomTabNavigationProps<'FEED'>) => {
  const [language] = useLanguage()
  const { data } = useGetPostsData()
  const navigation = useNavigation()
  const { user } = useUserContext()

  const [isContextMenuOpen, { setFalse: closeContextMenu, setTrue: openContextMenu }] =
    useBooleanState(false)
  const [menuCoords, setMenuCoords] = useState({ locationX: 0, locationY: 0 })

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

  const handleEdit = (
    e: GestureResponderEvent,
    target: { type: 'comment' | 'post'; id: string; author: string }
  ) => {
    // if (!(target.author === `${user?.firstName} ${user?.lastName}`)) return
    const { pageX, pageY } = e.nativeEvent
    setMenuCoords({ locationX: pageX, locationY: pageY })
    openContextMenu?.()
    // if (target.type === 'comment') {

    // }
  }

  if (!data) return <LoadingModal show />

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <FlatList
        ref={flatListRef}
        keyboardShouldPersistTaps="handled"
        onScrollToIndexFailed={() => {
          setTimeout(scrollToId, 100)
        }}
        ListHeaderComponent={<FeedHeader />}
        data={data}
        renderItem={({ item }) => <FeedPost post={item} handleEdit={handleEdit} />}
        keyExtractor={({ meta }) => meta.id}
        extraData={language}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
      <EditContextMenu
        coordsX={menuCoords.locationX}
        coordsY={menuCoords.locationY}
        isOpen={isContextMenuOpen}
        onDeletePress={() => closeContextMenu?.()}
        onEditPress={() => closeContextMenu?.()}
      />
    </SafeAreaWrapper>
  )
}
