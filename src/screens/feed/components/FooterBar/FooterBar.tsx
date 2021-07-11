import React from 'react'

import IconComment from 'assets/icons/icon-comment.svg'
import IconReaction from 'assets/icons/icon-reaction.svg'

import { Reaction } from 'screens/feed/types'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { MessageInput } from 'components/MessageInput'
import { useBooleanState } from 'hooks/useBooleanState'
import { Modal } from 'react-native'
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
      {messageInputOpened && <CreateCommentModal onBlur={hideMessageInput} />}
    </>
  )
}

type CreateCommentModalProps = {
  onBlur: F0
}

const CreateCommentModal = (props: CreateCommentModalProps) => (
  <Modal transparent animationType="slide">
    <Box flex={1} justifyContent="flex-end">
      <MessageInput onSubmitEditing={() => {}} onBlur={props.onBlur} defaultValue="" autofocus />
    </Box>
  </Modal>
)

type FooterBarContentProps = {
  reactions: Reaction[]
  onCommentBtnPress: F0
}

const FooterBarContent = (props: FooterBarContentProps) => {
  const { reactions, onCommentBtnPress } = props
  const { t } = useTranslation('feed')
  return (
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
      <Bubble padding="s" onPress={onCommentBtnPress}>
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
