import { Avatar } from 'components/Avatar'
import { useBooleanState } from 'hooks/useBooleanState'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { FeedPost, Comment as CommentType } from '../../types'
import { Bubble } from '../Bubble/Bubble'

// TODO: Extract condidtional Avatar and take care of hacky paddings :)

type CommentBoxProps = Pick<FeedPost, 'comments'>

export const CommentBox = ({ comments }: CommentBoxProps) => {
  const [opened, { toggle }] = useBooleanState(false)

  return (
    <Box padding="s">
      {comments.length > 0 && (
        <>
          <CommentBoxBtn quantity={comments.length} onPress={toggle} opened={opened} />
          <Box>
            {opened && (
              <FlatList
                data={comments}
                renderItem={({ item, index }) => {
                  const authorId = comments[index].meta.author.id
                  const prevAuthorId = comments?.[index - 1]?.meta.author?.id
                  return <Comment comment={item} hideAvatar={authorId === prevAuthorId} />
                }}
                keyExtractor={({ meta }) => meta.id}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  )
}

type CommentProps = {
  hideAvatar: boolean
  comment: CommentType
}

const Comment = ({ comment, hideAvatar = false }: CommentProps) => {
  const {
    text,
    meta: { author },
  } = comment

  return (
    <Box flexDirection="row" padding="xs" alignItems="flex-end">
      <Box marginRight="s" paddingRight={hideAvatar ? 'xl' : 0} paddingLeft={hideAvatar ? 'xs' : 0}>
        {!hideAvatar && <Avatar size="s" src={author.pictureUrl} />}
      </Box>
      <Bubble padding="s">
        <Text>{text}</Text>
      </Bubble>
    </Box>
  )
}

type CommentBoxBtnProps = {
  quantity: number
  opened: boolean
  onPress: F0
}

const CommentBoxBtn = ({ quantity, onPress, opened }: CommentBoxBtnProps) => {
  const { t } = useTranslation('feed')
  return (
    <BaseOpacity onPress={onPress} padding="s">
      <Text>
        {quantity === 0 ? (
          <>{t('noComments')}</>
        ) : (
          <>
            {quantity} {t('comments')} {opened ? '>' : '^'}
          </>
        )}
      </Text>
    </BaseOpacity>
  )
}
