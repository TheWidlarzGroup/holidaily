import React, { useEffect, useState } from 'react'
import IconComment from 'assets/icons/icon-comment.svg'
import IconReaction from 'assets/icons/icon-reaction.svg'
import { Reaction } from 'mock-api/models/miragePostTypes'
import { Box, Text, theme, useTheme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types'
import EmojiPicker from 'rn-emoji-keyboard'
import { useBooleanState } from 'hooks/useBooleanState'
import { Analytics } from 'services/analytics'
import { Bubble, BubbleProps } from '../Bubble/Bubble'
import { MoreLessBubble } from '../Bubble/MoreLessBubble'
import { ReactionBubble } from '../Bubble/ReactionBubble'

export type FooterBarContentProps = {
  postId: string
  reactions: Reaction[]
  onCommentBtnPress: F0
  handlePressReaction: F1<string>
  handleAddReaction: F1<EmojiType>
}

const BOX_MARGIN = 'xs'
const MARGINS_WIDTH = theme.spacing[BOX_MARGIN] * 2

export const FooterBarContent = (props: FooterBarContentProps) => {
  const { reactions, onCommentBtnPress } = props
  const [isPickerOpen, { setTrue: openPicker, setFalse: closePicker }] = useBooleanState(false)
  const [isShowMoreOpen, { setTrue: showMore, setFalse: showLess }] = useBooleanState(false)
  const { t } = useTranslation('feed')
  const theme = useTheme()
  const [footerWidth, setFooterWidth] = useState(0)
  const [bubblesSize, setBubblesSize] = useState({
    addCommentBtn: 0,
    addEmojiBtn: 0,
    singleEmoji: 0,
  })

  const maxEmojisInFirstLine = Math.trunc(
    (footerWidth - bubblesSize.addCommentBtn - bubblesSize.addEmojiBtn) / bubblesSize.singleEmoji
  )
  const maxEmojisInSecondLine = Math.trunc(footerWidth / bubblesSize.singleEmoji)
  const totalMaxNumberOfEmojis = maxEmojisInFirstLine + maxEmojisInSecondLine
  console.log(footerWidth - bubblesSize.addCommentBtn - bubblesSize.addEmojiBtn)
  console.log('max emmojis in first line', maxEmojisInFirstLine)
  console.log(
    'maxEmojisInFirstLine',
    footerWidth,
    bubblesSize.addCommentBtn,
    bubblesSize.addEmojiBtn,
    bubblesSize.singleEmoji
  )
  console.log('footer widtth', footerWidth)

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
      margin="s"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="flex-start"
      alignItems="center"
      flexGrow={1}
      flexShrink={1}
      onLayout={({ nativeEvent }) => {
        setFooterWidth(nativeEvent.layout.width)
      }}>
      <Bubble
        onLayout={({ nativeEvent }) => {
          if (bubblesSize.addCommentBtn) return
          setBubblesSize((prev) => ({
            ...prev,
            addCommentBtn: nativeEvent.layout.width + MARGINS_WIDTH,
          }))
        }}
        padding="s"
        marginHorizontal={BOX_MARGIN}
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
      <ReactionPickerBtn
        onPress={openPicker}
        onLayout={({ nativeEvent }) => {
          if (bubblesSize.addEmojiBtn) return
          setBubblesSize((prev) => ({
            ...prev,
            addEmojiBtn: nativeEvent.layout.width + MARGINS_WIDTH,
          }))
        }}
      />
      {reactions.length > 0 &&
        reactions.map((item, index) => {
          emojisCounter = index
          if (!isShowMoreOpen && emojisCounter >= totalMaxNumberOfEmojis - 1) return
          return (
            <ReactionBubble
              key={item.type}
              handlePressReaction={props.handlePressReaction}
              reaction={item}
              setBubblesSize={setBubblesSize}
              reactionBubbleSize={bubblesSize.singleEmoji}
              bubbleMargin={BOX_MARGIN}
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
