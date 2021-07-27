import React from 'react'

import IconComment from 'assets/icons/icon-comment.svg'
import IconReaction from 'assets/icons/icon-reaction.svg'

import { Reaction } from 'screens/feed/types'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import EmojiPicker from 'rn-emoji-keyboard'
import { useBooleanState } from 'hooks/useBooleanState'
import { Bubble, BubbleProps } from '../Bubble/Bubble'
import { ReactionBubble } from '../Bubble/ReactionBubble'

type FooterBarProps = {
  reactions: Reaction[]
}

export const FooterBar = ({ reactions }: FooterBarProps) => {
  const [isPickerOpen, { setTrue: openPicker, setFalse: closePicker }] = useBooleanState(false)
  const { t } = useTranslation('feed')
  return (
    <Box flexDirection="row" padding="s" justifyContent="space-between" alignItems="flex-start">
      <Box
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        flexGrow={1}
        flexShrink={1}>
        <ReactionPickerBtn
          onPress={() => {
            openPicker()
          }}
        />
        <EmojiPicker
          onEmojiSelected={(e) => console.log('Selected emoji:', e)}
          open={isPickerOpen}
          onClose={() => {
            closePicker()
          }}
        />
        {reactions &&
          reactions.map(({ type, users }) => (
            <ReactionBubble key={type} emoji={type} quantity={users.length} selected={false} />
          ))}
      </Box>
      <Bubble padding="s">
        <IconComment />
        <Text padding="xs">{t('postCommentBtn')}</Text>
      </Bubble>
    </Box>
  )
}

export const ReactionPickerBtn = (props: BubbleProps) => (
  <Bubble {...props}>
    <IconReaction />
  </Bubble>
)
