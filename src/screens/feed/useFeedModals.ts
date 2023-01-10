import { useDeleteComment, useEditComment } from 'dataAccess/mutations/useAddReactionsComment'
import { useAddPostWithNewId, useDeletePost } from 'dataAccess/mutations/useAddPost'
import { useGetNotificationsConfig } from 'utils/notifications/notificationsConfig'
import { useBooleanState } from 'hooks/useBooleanState'
import { EditTargetType, FeedPost as FeedPostType } from 'mock-api/models/miragePostTypes'
import { useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { BottomTabNavigationType } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import EditIcon from 'assets/icons/icon-edit2.svg'
import BinIcon from 'assets/icons/icon-bin.svg'
import ReportIcon from 'assets/icons/circle-cross.svg'
import HideIcon from 'assets/icons/icon-password-invisible.svg'
import Svg from 'react-native-svg'
import { Analytics } from 'services/analytics'

type NavigationHookType = BottomTabNavigationType<'FEED'> & typeof DrawerActions

type ModalOption = {
  Icon: Svg
  text: string
  onPress: F0
  show?: boolean
}

export const useFeedModals = (data: FeedPostType[] | undefined) => {
  const [modalOptions, setModalOptions] = useState<ModalOption[]>([])
  const [editTarget, setEditTarget] = useState<EditTargetType | null>()

  const { mutate: deleteComment } = useDeleteComment()
  const { mutate: editComment } = useEditComment()
  const { mutate: deletePost } = useDeletePost()
  const { mutate: addPostWithNewId } = useAddPostWithNewId()
  const { user, updateUser } = useUserContext()

  const { t } = useTranslation('feed')

  const navigation = useNavigation<NavigationHookType>()

  const [isMessageInputOpen, { setFalse: closeMessageInput, setTrue: openMessageInput }] =
    useBooleanState(false)
  const [isOptionsModalOpen, { setFalse: closeOptionsModal, setTrue: openOptionsModal }] =
    useBooleanState(false)

  const { notify } = useGetNotificationsConfig()

  const handleSetMessageContent = (text: string) => {
    if (editTarget?.type === 'comment') {
      setEditTarget((prev) => prev && { ...prev, text })
    }
  }

  const onPressModalDelete = (target: EditTargetType) => {
    closeOptionsModal?.()
    if (target?.type === 'comment') {
      deleteComment(target.commentId, {
        onSuccess: () => {
          notify('successCustom', { params: { title: t('commentDeleted') } })
        },
      })
    }
    if (target?.type === 'post') {
      const deletedPost = data?.find((post) => post.id === target.postId)
      deletePost(target.postId, {
        onSuccess: () => {
          notify('successCustom', {
            params: {
              title: t('postDeleted'),
              onPressText: t('undo'),
              onPress: () => {
                if (deletedPost) addPostWithNewId(deletedPost)
              },
            },
          })
        },
      })
    }
    setEditTarget(null)
  }

  const onPressModalEdit = (target: EditTargetType) => {
    closeOptionsModal?.()
    if (target?.type === 'comment') {
      if (!target.text) return
      handleSetMessageContent(target?.text)
      setTimeout(() => openMessageInput(), 400)
    }
    if (target?.type === 'post') {
      navigation.navigate('CREATE_POST_NAVIGATION', {
        screen: 'CREATE_POST',
        params: { editPostId: target.postId },
      })
      setEditTarget(null)
    }
  }

  const onCommentEdit = () => {
    closeMessageInput()
    if (editTarget?.type === 'comment') {
      editComment(
        { ...editTarget, text: editTarget?.text },
        {
          onSuccess: () => {
            notify('successCustom', { params: { title: t('changesSaved') } })
          },
        }
      )
    }
    handleSetMessageContent('')
    setEditTarget(null)
  }

  const generateModalOptions = (target: EditTargetType) => {
    const onEditPress = () => {
      onPressModalEdit(target)
    }

    const onDeletePress = () => {
      onPressModalDelete(target)
    }

    const updateBlockedPosts = () => {
      const updatedBlockedPosts =
        user?.blockedPostsIds && user?.blockedPostsIds?.length > 0
          ? [...user?.blockedPostsIds, target.postId]
          : [target.postId]

      updateUser({ blockedPostsIds: updatedBlockedPosts })
    }

    const onReportPress = () => {
      Analytics().track('FEED_POST_REPORT', { postId: target.postId, userId: user?.id })
      updateBlockedPosts()
      closeOptionsModal?.()
    }

    const onHidePress = () => {
      updateBlockedPosts()
      closeOptionsModal?.()
    }

    const unBlockPost = () => {
      const posts = user?.blockedPostsIds?.filter((a) => a !== target.postId)

      updateUser({ blockedPostsIds: posts })
      closeOptionsModal?.()
    }

    const editModalOptions = [
      {
        Icon: EditIcon,
        text: t('edit'),
        onPress: onEditPress,
      },
      {
        Icon: BinIcon,
        text: t('delete'),
        onPress: onDeletePress,
      },
    ]

    const isPostBlocked = user?.blockedPostsIds?.includes(target.postId)

    const reportModalOptions = [
      {
        Icon: HideIcon,
        text: t('hidePost'),
        onPress: onHidePress,
        show: !isPostBlocked,
      },
      {
        Icon: ReportIcon,
        text: t('reportPost'),
        onPress: onReportPress,
        show: !isPostBlocked,
      },
      {
        Icon: EditIcon,
        text: t('showPost'),
        onPress: unBlockPost,
        show: isPostBlocked,
      },
    ]

    const blockPostsOptions = reportModalOptions.filter((a) => a.show)

    const finalOptions = target.authorId === user?.id ? editModalOptions : blockPostsOptions
    setModalOptions(finalOptions)
  }

  const openEditModal = (target: EditTargetType) => {
    setEditTarget(target)
    generateModalOptions(target)
    openOptionsModal?.()
  }

  return {
    onCommentEdit,
    handleSetMessageContent,
    closeOptionsModal,
    closeMessageInput,
    isMessageInputOpen,
    isOptionsModalOpen,
    setEditTarget,
    editTarget,
    openEditModal,
    modalOptions,
  }
}
