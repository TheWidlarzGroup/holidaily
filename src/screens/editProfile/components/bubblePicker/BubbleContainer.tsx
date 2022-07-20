import React, { useEffect, useState } from 'react'
import { Box, mkUseStyles, Text, useTheme } from 'utils/theme'
import { shadow } from 'utils/theme/shadows'
import { UserProfileNavigationProps } from 'navigation/types'
import { windowWidth } from 'utils/deviceSizes'
import { useTranslation } from 'react-i18next'
import { AnimatedBox } from 'components/AnimatedBox'
import { Bubble } from './Bubble'
import { useBubbles } from './useBubbles'
import { CheckMark } from './Checkmark'
import { BUBBLE_CONSTANTS as C } from './BubbleHelper'
import { BubbleContainerButtons } from './BubbleContainerButtons'
import { BubbleContainerHeader } from './BubbleContainerHeader'
import { AnimatedBubble } from './AnimatedBubble'

export const BubbleContainer = ({
  route: { params: p },
}: UserProfileNavigationProps<'COLOR_PICKER'>) => {
  const styles = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('userProfile')
  const [dropColor, setDropColor] = useState(theme.colors.colorPickerDropArea)
  const { animatedDrop, bubbles, animateCheckmark, dropArea, animateDropArea } = useBubbles()

  useEffect(() => {
    if (dropColor !== theme.colors.colorPickerDropArea) p.onChange(dropColor)
  }, [dropColor, p, theme.colors.colorPickerDropArea])

  return (
    <Box flex={1} backgroundColor="colorPickerBackdrop" flexWrap="wrap">
      {animateCheckmark && <CheckMark animateCheckmark={animateCheckmark} />}
      <BubbleContainerButtons />
      <BubbleContainerHeader />
      <AnimatedBox
        style={[
          styles.dropArea,
          animatedDrop,
          {
            backgroundColor: dropColor,
            zIndex: dropColor === theme.colors.colorPickerDropArea ? 0 : 3,
          },
        ]}
      />
      <AnimatedBubble currentColor={p.value} bubbles={bubbles} />
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
  )
}

const useStyles = mkUseStyles(() => ({
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
