import React, { useEffect, useState } from 'react'
import IconComment from 'assets/icons/icon-comment.svg'
import IconReaction from 'assets/icons/icon-reaction.svg'
import { Reaction } from 'mock-api/models/miragePostTypes'
import { Box, Text, useTheme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types'
import EmojiPicker from 'rn-emoji-keyboard'
import { useBooleanState } from 'hooks/useBooleanState'
import { Analytics } from 'services/analytics'
import { Bubble, BubbleProps } from '../Bubble/Bubble'
import { ReactionBubble } from '../Bubble/ReactionBubble'
import { MoreLessBubble } from '../Bubble/MoreLessBubble'

type FooterBarContentProps = {
  postId: string | undefined
  reactions: Reaction[]
  onCommentBtnPress: F0
  handlePressReaction: F1<string>
  handleAddReaction: F1<EmojiType>
}

const ADD_COMMENT_BTN_WIDTH = 136
const ADD_EMOJI_BTN_WIDTH = 50
const EMOJI_BTN_WIDTH = 70

export const FooterBarContent = (props: FooterBarContentProps) => {
  const { reactions, onCommentBtnPress } = props
  const [isPickerOpen, { setTrue: openPicker, setFalse: closePicker }] = useBooleanState(false)
  const [isShowMoreOpen, { setTrue: showMore, setFalse: showLess }] = useBooleanState(false)
  const { t } = useTranslation('feed')
  const theme = useTheme()
  const [footerWidth, setFooterWidth] = useState(0)

  const maxEmojisInFirstLine = Math.trunc(
    (footerWidth - ADD_COMMENT_BTN_WIDTH - ADD_EMOJI_BTN_WIDTH) / EMOJI_BTN_WIDTH
  )
  const maxEmojisInSecondLine = Math.trunc(footerWidth / EMOJI_BTN_WIDTH)
  const totalMaxNumberOfEmojis = maxEmojisInFirstLine + maxEmojisInSecondLine

  let emojisCounter = 0

  useEffect(() => {
    if (isPickerOpen) Analytics().track('FEED_EMOJI_PICKER_OPENED', { postId: props.postId })
  }, [isPickerOpen, props.postId])

  const handleCommentBtn = () => {
    Analytics().track('FEED_MESSAGE_INPUT_MODAL_OPENED', { postId: props.postId })
    onCommentBtnPress()
  }

  return (
    <Box
      flexDirection="row"
      padding="s"
      paddingTop="xm"
      justifyContent="space-between"
      alignItems="center"
      onLayout={({ nativeEvent }) => {
        setFooterWidth(nativeEvent.layout.width)
      }}>
      <Box
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
        flexGrow={1}
        flexShrink={1}>
        <Bubble
          padding="s"
          marginHorizontal="xs"
          marginTop="xs"
          onPress={handleCommentBtn}
          height={42}
          width={110}
          alignSelf="flex-start">
          <IconComment color={theme.colors.black} />
          <Text variant="buttonXS" paddingHorizontal="s" paddingVertical="xs">
            {t('postCommentBtn')}
          </Text>
        </Bubble>
        <EmojiPicker
          onEmojiSelected={props.handleAddReaction}
          open={isPickerOpen}
          onClose={closePicker}
        />
        <ReactionPickerBtn onPress={openPicker} />
        {reactions &&
          reactions.map((item, index) => {
            emojisCounter = index
            if (!isShowMoreOpen && emojisCounter >= totalMaxNumberOfEmojis - 1) return
            return (
              <ReactionBubble
                key={item.type}
                handlePressReaction={props.handlePressReaction}
                reaction={item}
              />
            )
          })}
        {!isShowMoreOpen && emojisCounter >= totalMaxNumberOfEmojis - 1 && (
          <MoreLessBubble
            type="more"
            count={emojisCounter - totalMaxNumberOfEmojis + 2}
            onPress={showMore}
          />
        )}
        {isShowMoreOpen && <MoreLessBubble type="less" onPress={showLess} />}
      </Box>
    </Box>
  )
}

const ICON_SIZE = 24

export const ReactionPickerBtn = (props: BubbleProps) => {
  const theme = useTheme()
  return (
    <Bubble {...props} width={42} height={42} margin="xs">
      <IconReaction color={theme.colors.black} width={ICON_SIZE} height={ICON_SIZE} />
    </Bubble>
  )
}
