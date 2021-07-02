import React from 'react'

import IconComment from 'assets/icons/icon-comment.svg'
import IconReaction from 'assets/icons/icon-reaction.svg'

import { Reaction } from 'screens/feed/types'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { useBooleanState } from 'hooks/useBooleanState'
import { MessageInput } from 'components/MessageInput'
import { Bubble, BubbleProps } from '../Bubble/Bubble'
import { ReactionBubble } from '../Bubble/ReactionBubble'

type FooterBarProps = {
  reactions: Reaction[]
}

export const FooterBar = ({ reactions }: FooterBarProps) => {
  const [displayCommentInput, { setTrue: showCommentInput, setFalse: hideCommentInput }] =
    useBooleanState(false)
  const { t } = useTranslation('feed')
  return (
    <>
      <Box flexDirection="row" padding="s" justifyContent="space-between" alignItems="flex-start">
        <Box
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="flex-start"
          flexGrow={1}
          flexShrink={1}>
          <ReactionPickerBtn onPress={() => {}} />
          {reactions &&
            reactions.map(({ type, users }) => (
              <ReactionBubble key={type} emoji={type} quantity={users.length} selected={false} />
            ))}
        </Box>
        <Bubble padding="s" onPress={showCommentInput}>
          <Box padding="xs">
            <IconComment />
          </Box>
          <Text padding="xs">{t('postCommentBtn')}</Text>
        </Bubble>
      </Box>
      {displayCommentInput && (
        <MessageInput
          autofocus
          defaultValue=""
          onSubmitEditing={(x) => {
            console.log(x)
          }}
          onBlur={hideCommentInput}
        />
      )}
    </>
  )
}

export const ReactionPickerBtn = (props: BubbleProps) => (
  <Bubble {...props}>
    <IconReaction />
  </Bubble>
)
