import React from 'react'

import IconComment from 'assets/icons/icon-comment.svg'
import IconReaction from 'assets/icons/icon-reaction.svg'

import { Reaction } from 'screens/feed/types'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import EmojiPicker from 'rn-emoji-keyboard'
import { useBooleanState } from 'hooks/useBooleanState'
import { MessageInputModal } from 'components/MessageInputModal'
import { Bubble, BubbleProps } from '../Bubble/Bubble'
import { ReactionBubble } from '../Bubble/ReactionBubble'

type FooterBarProps = {
  reactions: Reaction[]
}

export const FooterBar = ({ reactions }: FooterBarProps) => {
  const [messageInputOpened, { setTrue: showMessageInput, setFalse: hideMessageInput }] =
    useBooleanState(false)
  return (
    <>
      <FooterBarContent onCommentBtnPress={showMessageInput} reactions={reactions} />
      <MessageInputModal
        visible={messageInputOpened}
        onSubmitEditing={hideMessageInput}
        onRequestClose={hideMessageInput}
        autofocus
      />
    </>
  )
}

type FooterBarContentProps = {
  reactions: Reaction[]
  onCommentBtnPress: F0
}

const FooterBarContent = (props: FooterBarContentProps) => {
  const { reactions, onCommentBtnPress } = props
  const [isPickerOpen, { setTrue: openPicker, setFalse: closePicker }] = useBooleanState(false)
  const { t } = useTranslation('feed')
  return (
    <Box flexDirection="row" padding="s" justifyContent="space-between" alignItems="center">
      <Box
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
        flexGrow={1}
        flexShrink={1}>
        <EmojiPicker
          onEmojiSelected={(e) => console.log('Selected emoji:', e)}
          open={isPickerOpen}
          onClose={closePicker}
        />
        {reactions &&
          reactions.map(({ type, users }) => (
            <ReactionBubble key={type} emoji={type} quantity={users.length} selected={false} />
          ))}
        <ReactionPickerBtn onPress={openPicker} />
      </Box>
      <Bubble padding="s" onPress={onCommentBtnPress} height={42}>
        <IconComment />
        <Text variant="captionText" fontWeight="700" paddingHorizontal="s" paddingVertical="xs">
          {t('postCommentBtn')}
        </Text>
      </Bubble>
    </Box>
  )
}

export const ReactionPickerBtn = (props: BubbleProps) => (
  <Bubble {...props} width={42} height={42}>
    <IconReaction />
  </Bubble>
)
