import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { EditContextMenu } from 'components/EditContextMenu'
import { LoadingModal } from 'components/LoadingModal'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useDeleteComment, useEditComment } from 'dataAccess/mutations/useAddReactionsComment'
import { useGetPostsData } from 'dataAccess/queries/useFeedPostsData'
import { useBooleanState } from 'hooks/useBooleanState'
import { useLanguage } from 'hooks/useLanguage'
import { EditTargetType } from 'mock-api/models/miragePostTypes'
import { BottomTabNavigationProps } from 'navigation/types'
import { FlatList, GestureResponderEvent } from 'react-native'
import { FeedHeader } from './components/FeedHeader/FeedHeader'
import { FeedPost } from './components/FeedPost/FeedPost'

const MAX_SCROLL_RETRIES = 4

export const Feed = ({ route: { params: p } }: BottomTabNavigationProps<'FEED'>) => {
  const [language] = useLanguage()
  const { data } = useGetPostsData()
  const navigation = useNavigation()

  const [isContextMenuOpen, { setFalse: closeMenu, setTrue: openMenu }] = useBooleanState(false)
  const [menuCoords, setMenuCoords] = useState({ pageX: 0, pageY: 0 })
  const [editTarget, setEditTarget] = useState<EditTargetType>()

  // const { user } = useUserContext()
  const { mutate: deleteComment } = useDeleteComment()
  const { mutate: editComment } = useEditComment()

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

  const openContextMenu = (e: GestureResponderEvent, target: EditTargetType) => {
    // if (!(target.author === `${user?.firstName} ${user?.lastName}`)) return
    const { pageX, pageY } = e.nativeEvent
    setMenuCoords({ pageX, pageY })
    setEditTarget(target)
    openMenu?.()
  }

  const handleDelete = () => {
    if (editTarget?.type === 'comment') {
      deleteComment(editTarget.id)
    }
    closeMenu?.()
  }

  const handleEdit = () => {
    if (editTarget?.type === 'comment') {
      editComment(editTarget.id)
    }
    closeMenu?.()
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
        renderItem={({ item }) => <FeedPost post={item} openContextMenu={openContextMenu} />}
        keyExtractor={({ meta }) => meta.id}
        extraData={language}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
      <EditContextMenu
        coordsX={menuCoords.pageX}
        coordsY={menuCoords.pageY}
        isOpen={isContextMenuOpen}
        onDeletePress={handleDelete}
        onEditPress={handleEdit}
      />
    </SafeAreaWrapper>
  )
}
