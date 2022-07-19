import React, { useEffect, useState } from 'react'
import Animated from 'react-native-reanimated'
import { Box, mkUseStyles, Text, useTheme } from 'utils/theme'
import { shadow } from 'utils/theme/shadows'
import { windowWidth } from 'utils/deviceSizes'
import { useTranslation } from 'react-i18next'
import Modal from 'react-native-modal'
import { ModalProps } from 'react-native'
import { Bubble } from './Bubble'
import { useBubbles } from './useBubbles'
import { CheckMark } from './Checkmark'
import { BUBBLE_CONSTANTS as C } from './BubbleHelper'
import { BubbleContainerButtons } from './BubbleContainerButtons'
import { BubbleContainerHeader } from './BubbleContainerHeader'
import { AnimatedBubble } from './AnimatedBubble'

type BubbleContainerProps = {
  onChange: F1<string>
  value: string
  isOpen: boolean
  handleClose: F0
} & Partial<Omit<ModalProps, 'isVisible'>>

const DropArea = Animated.createAnimatedComponent(Box)

export const BubbleContainer = (props: BubbleContainerProps) => {
  const styles = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('userProfile')
  const [dropColor, setDropColor] = useState(theme.colors.colorPickerDropArea)
  const { animatedDrop, bubbles, animateCheckmark, dropArea, animateDropArea } = useBubbles()

  useEffect(() => {
    if (dropColor !== theme.colors.colorPickerDropArea) props.onChange(dropColor)
  }, [dropColor, props, theme.colors.colorPickerDropArea])

  return (
    <Modal
      isVisible={props.isOpen}
      style={styles.modal}
      coverScreen
      statusBarTranslucent
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      hideModalContentWhileAnimating>
      <Box flex={1} backgroundColor="rippleColor" flexWrap="wrap">
        {animateCheckmark && <CheckMark animateCheckmark={animateCheckmark} />}
        <BubbleContainerButtons handleClose={props.handleClose} />
        <BubbleContainerHeader />
        <DropArea
          style={[
            styles.dropArea,
            animatedDrop,
            {
              backgroundColor: dropColor,
              zIndex: dropColor === theme.colors.colorPickerDropArea ? 0 : 3,
            },
          ]}
        />
        <AnimatedBubble currentColor={props.value} bubbles={bubbles} />
        {bubbles.map((bubble) => (
          <Box position="absolute" key={bubble.id}>
            <Bubble
              {...bubble}
              diameter={C.BUBBLE_SIZE}
              setDropColor={setDropColor}
              dropArea={dropArea.value}
              animateDropArea={animateDropArea}
            />
          </Box>
        ))}
        <Box position="absolute" bottom={64} width="100%" alignItems="center">
          <Text variant="textBoldXS" color="alwaysWhite">
            {t('dropAreaText')}
          </Text>
        </Box>
      </Box>
    </Modal>
  )
}

const useStyles = mkUseStyles(() => ({
  modal: {
    margin: 0,
  },
  dropArea: {
    position: 'absolute',
    width: windowWidth * 1.2,
    left: -windowWidth * 0.1,
    aspectRatio: 1,
    borderRadius: 500,
    shadowColor: shadow.md.shadowColor,
    shadowRadius: shadow.md.shadowRadius,
    shadowOpacity: shadow.md.shadowOpacity,
    shadowOffset: shadow.md.shadowOffset,
  },
  scaleCheckmark: {
    transform: [{ scale: 2 }],
  },
}))
