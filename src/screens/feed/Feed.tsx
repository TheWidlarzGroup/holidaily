import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { LoadingModal } from 'components/LoadingModal'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useDeleteComment, useEditComment } from 'dataAccess/mutations/useAddReactionsComment'
import { useGetPostsData } from 'dataAccess/queries/useFeedPostsData'
import { useBooleanState } from 'hooks/useBooleanState'
import { useLanguage } from 'hooks/useLanguage'
import { EditTargetType } from 'mock-api/models/miragePostTypes'
import { BottomTabNavigationProps } from 'navigation/types'
import { FlatList } from 'react-native'
import { OptionsModal } from 'components/OptionsModal'
import EditIcon from 'assets/icons/icon-edit2.svg'
import BinIcon from 'assets/icons/icon-bin.svg'
import { MessageInputModal } from 'components/MessageInputModal'
import { FeedHeader } from './components/FeedHeader/FeedHeader'
import { FeedPost } from './components/FeedPost/FeedPost'

const MAX_SCROLL_RETRIES = 4

export const Feed = ({ route: { params: p } }: BottomTabNavigationProps<'FEED'>) => {
  const [language] = useLanguage()
  const { data } = useGetPostsData()
  const navigation = useNavigation()
  const { t } = useTranslation('feed')

  const [messageInputOpened, { setTrue: showMessageInput, setFalse: hideMessageInput }] =
    useBooleanState(false)
  const [isModalOpen, { setFalse: closeModal, setTrue: openModal }] = useBooleanState(false)
  const [isEditingComment, { setFalse: setEditingCommentFalse, setTrue: setEditingCommentTrue }] =
    useBooleanState(false)
  const [editTarget, setEditTarget] = useState<EditTargetType>()
  const [messageContent, setMessageContent] = useState('')

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

  const openEditModal = (target: EditTargetType) => {
    // if (!(target.author === `${user?.firstName} ${user?.lastName}`)) return
    setEditTarget(target)
    openModal?.()
    if (target.type === 'comment') {
      setEditingCommentTrue()
    }
  }

  const handleDelete = () => {
    closeModal?.()
    if (editTarget?.type === 'comment') {
      deleteComment({ ...editTarget })
      setEditingCommentFalse()
    }
  }

  const handleEdit = () => {
    closeModal?.()
    if (editTarget?.type === 'comment') {
      if (!editTarget.text) return
      setMessageContent(editTarget?.text)
      setTimeout(() => showMessageInput(), 400)
    }
  }

  const handleEditComment = () => {
    hideMessageInput()
    if (editTarget?.type === 'comment') {
      editComment({
        ...editTarget,
        text: messageContent,
      })
    }
    setMessageContent('')
    setEditingCommentFalse()
  }

  const pictureChangeOptions = [
    {
      Icon: EditIcon,
      text: t('edit'),
      onPress: handleEdit,
    },
    {
      Icon: BinIcon,
      text: t('delete'),
      onPress: handleDelete,
    },
  ]

  if (!data) return <LoadingModal show />

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <FlatList
        ref={flatListRef}
        keyboardShouldPersistTaps="handled"
        onScrollToIndexFailed={() => {
          setTimeout(scrollToId, 100)
        }}
        ListHeaderComponent={FeedHeader}
        data={data}
        renderItem={({ item }) => (
          <FeedPost post={item} openEditModal={openEditModal} isEditingComment={isEditingComment} />
        )}
        keyExtractor={({ meta }) => meta.id}
        extraData={language}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
      <OptionsModal
        options={pictureChangeOptions}
        isOpen={isModalOpen}
        onHide={closeModal}
        onDismiss={setEditingCommentFalse}
        hideBackdrop
      />
      <MessageInputModal
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        visible={messageInputOpened}
        onSubmitEditing={hideMessageInput}
        onRequestClose={hideMessageInput}
        handleEditComment={handleEditComment}
        autofocus
      />
    </SafeAreaWrapper>
  )
}
