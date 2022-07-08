import React from 'react'
import { Avatar } from 'components/Avatar'
import { Box, Text } from 'utils/theme'
import { Comment as CommentType, EditTargetType } from 'mock-api/models/miragePostTypes'
import { useTranslation } from 'react-i18next'
import { useBooleanState } from 'hooks/useBooleanState'
import { Bubble } from '../Bubble/Bubble'

type CommentProps = {
  comment: CommentType
  openEditModal: F1<EditTargetType>
  id: string
  editCommentId: string
  setEditCommentId: F1<string>
  isEditingTarget: boolean
  postId: string
  hideAvatar?: boolean
}

export const Comment = ({
  comment,
  hideAvatar,
  openEditModal,
  id,
  postId,
  editCommentId,
  setEditCommentId,
  isEditingTarget,
}: CommentProps) => {
  const [isCommentExpanded, { setTrue: expandComment }] = useBooleanState(false)
  const { t } = useTranslation('feed')

  const numberOfChars = isCommentExpanded ? 999 : 130

  const handleOnPress = () => {
    openEditModal({
      type: 'comment',
      postId,
      commentId: comment.id,
      authorId: comment.author.id,
      text: comment.text,
    })
    setEditCommentId(comment.id)
  }

  return (
    <Box flexDirection="row" padding="xs" alignItems="flex-start" marginTop="xs">
      <Box
        marginRight="s"
        paddingRight={hideAvatar ? 'xl' : 'none'}
        marginLeft={hideAvatar ? '-s' : 'none'}>
        {!hideAvatar && (
          <Avatar
            size="s"
            src={comment.author?.pictureUrl}
            userDetails={
              comment.author.userColor
                ? {
                    userColor: comment.author.userColor,
                    firstName: comment.author.name,
                    lastName: comment.author.lastName,
                  }
                : undefined
            }
          />
        )}
      </Box>
      <Bubble
        borderColor={editCommentId === id && isEditingTarget ? 'special' : 'transparent'}
        borderWidth={1}
        padding="xm"
        flexShrink={1}
        activeOpacity={0.6}
        isCommentBubble
        marginTop="-xs"
        onLongPress={handleOnPress}
        onPress={handleOnPress}>
        <Text variant="textXS">
          {comment?.text?.slice(0, numberOfChars)}
          {comment?.text?.length > 130 && !isCommentExpanded && (
            <>
              {'... '}
              <Text variant="textXS" color="special" onPress={() => expandComment()}>
                {t('seeMore')}
              </Text>
            </>
          )}
        </Text>
      </Bubble>
    </Box>
  )
}
