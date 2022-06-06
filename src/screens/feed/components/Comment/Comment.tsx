import { Avatar } from 'components/Avatar'
import React from 'react'
import { Box, Text } from 'utils/theme'
import { Comment as CommentType } from 'mock-api/models/miragePostTypes'
import { useTranslation } from 'react-i18next'
import { GestureResponderEvent } from 'react-native'
import { useBooleanState } from 'hooks/useBooleanState'
import { Bubble } from '../Bubble/Bubble'

type CommentProps = {
  comment: CommentType
  handleEdit: F2<GestureResponderEvent, { type: 'comment' | 'post'; id: string; author: string }>
  hideAvatar?: boolean
}

export const Comment = ({ comment, hideAvatar, handleEdit }: CommentProps) => {
  const [isCommentExpanded, { setTrue: expandComment }] = useBooleanState(false)
  const { t } = useTranslation('feed')

  const numberOfChars = isCommentExpanded ? 999 : 130

  return (
    <Box flexDirection="row" padding="xs" alignItems="flex-start" marginTop="xs">
      <Box
        marginRight="s"
        paddingRight={hideAvatar ? 'xl' : 'none'}
        marginLeft={hideAvatar ? '-s' : 'none'}>
        {!hideAvatar && (
          <Avatar
            size="s"
            src={comment.meta.author.pictureUrl}
            userDetails={
              comment.meta.author.userColor
                ? {
                    userColor: comment.meta.author.userColor,
                    firstName: comment.meta.author.name,
                    lastName: comment.meta.author.lastName,
                  }
                : undefined
            }
          />
        )}
      </Box>
      <Bubble
        padding="xm"
        flexShrink={1}
        activeOpacity={0.6}
        isCommentBubble
        marginTop="-xs"
        onLongPress={(e) =>
          handleEdit(e, { type: 'comment', id: comment.meta.id, author: comment.meta.author.name })
        }>
        <Text variant="textXS">
          {comment.text.slice(0, numberOfChars)}
          {comment.text.length > 130 && !isCommentExpanded && (
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
