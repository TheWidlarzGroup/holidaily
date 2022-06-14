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
import { useGetNotificationsConfig } from 'utils/notifications/notificationsConfig'
import BinIcon from 'assets/icons/icon-bin.svg'
import { MessageInputModal } from 'components/MessageInputModal'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { FeedHeader } from './components/FeedHeader/FeedHeader'
import { FeedPost } from './components/FeedPost/FeedPost'

const MAX_SCROLL_RETRIES = 4

export const Feed = ({ route: { params: p } }: BottomTabNavigationProps<'FEED'>) => {
  const [language] = useLanguage()
  const { notify } = useGetNotificationsConfig()
  const { data } = useGetPostsData()
  const navigation = useNavigation()
  const { t } = useTranslation('feed')
  const { user } = useUserContext()
  const flatListRef = useRef<FlatList | null>(null)
  const scrollRetries = useRef(0)

  const [isMessageInputOpen, { setFalse: closeMessageInput, setTrue: openMessageInput }] =
    useBooleanState(false)
  const [isOptionsModalOpen, { setFalse: closeOptionsModal, setTrue: openOptionsModal }] =
    useBooleanState(false)
  const [editTarget, setEditTarget] = useState<EditTargetType | null>()

  const { mutate: deleteComment } = useDeleteComment()
  const { mutate: editComment } = useEditComment()

  const openEditModal = (target: EditTargetType) => {
    if (!(target.authorId === user?.id)) return
    setEditTarget(target)
    openOptionsModal?.()
  }

  const onPressModalDelete = () => {
    closeOptionsModal?.()
    if (editTarget?.type === 'comment') {
      deleteComment(editTarget.commentId)
      notify('successCustom', { params: { title: t('commentDeleted') } })
    }
    setEditTarget(null)
  }

  const onPressModalEdit = () => {
    closeOptionsModal?.()
    if (editTarget?.type === 'comment') {
      if (!editTarget.text) return
      handleSetMessageContent(editTarget?.text)
      setTimeout(() => openMessageInput(), 400)
    }
  }

  const onCommentEdit = () => {
    closeMessageInput()
    if (editTarget?.type === 'comment') {
      editComment({ ...editTarget, text: editTarget?.text })
    }
    handleSetMessageContent('')
    setEditTarget(null)
    notify('successCustom', { params: { title: t('changesSaved') } })
  }

  const handleSetMessageContent = (text: string) => {
    if (editTarget?.type === 'comment') {
      setEditTarget((prev) => prev && { ...prev, text })
    }
  }

  const scrollToId = useCallback(() => {
    if (
      flatListRef.current &&
      p?.postId &&
      !!data?.length &&
      scrollRetries.current <= MAX_SCROLL_RETRIES
    ) {
      const index = data.findIndex((post) => String(post.id) === String(p.postId))
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

  const modalOptions = [
    {
      Icon: EditIcon,
      text: t('edit'),
      onPress: onPressModalEdit,
    },
    {
      Icon: BinIcon,
      text: t('delete'),
      onPress: onPressModalDelete,
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
          <FeedPost
            post={item}
            openEditModal={openEditModal}
            isEditingTarget={editTarget?.type === 'comment' || editTarget?.type === 'post'}
          />
        )}
        keyExtractor={(post) => post.id}
        extraData={language}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
      <OptionsModal
        options={modalOptions}
        isOpen={isOptionsModalOpen}
        onHide={closeOptionsModal}
        onSwipeStart={() => setEditTarget(null)}
        hideBackdrop
      />
      <MessageInputModal
        messageContent={editTarget?.type === 'comment' && editTarget?.text ? editTarget?.text : ''}
        setMessageContent={handleSetMessageContent}
        visible={isMessageInputOpen}
        onSubmitEditing={closeMessageInput}
        onRequestClose={closeMessageInput}
        handleEditComment={onCommentEdit}
        autofocus
      />
    </SafeAreaWrapper>
  )
}
