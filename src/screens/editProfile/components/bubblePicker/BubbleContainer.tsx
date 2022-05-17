import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Box, mkUseStyles, Theme, useTheme } from 'utils/theme'
import { shadow } from 'utils/theme/shadows'
import { UserProfileNavigationProps } from 'navigation/types'
import { windowWidth } from 'utils/deviceSizes'
import { Bubble } from './Bubble'
import { useBubbles } from './useBubbles'
import { CheckMark } from './Checkmark'
import { BUBBLE_CONSTANTS as C } from './BubbleHelper'
import { BubbleContainerButtons } from './BubbleContainerButtons'
import { BubbleContainerHeader } from './BubbleContainerHeader'

const DropArea = Animated.createAnimatedComponent(Box)

export const BubbleContainer = ({
  route: { params: p },
}: UserProfileNavigationProps<'ColorPicker'>) => {
  const styles = useStyles()
  const theme = useTheme()
  const [dropColor, setDropColor] = useState(theme.colors.colorPickerDropArea)
  const { animatedDrop, bubbles, animateCheckmark, dropArea, animateDropArea } = useBubbles()

  useEffect(() => {
    if (dropColor !== theme.colors.colorPickerDropArea) p.onChange(dropColor)
  }, [dropColor, p, theme.colors.colorPickerDropArea])

  return (
    <View style={styles.mainContainer}>
      {animateCheckmark && <CheckMark animateCheckmark={animateCheckmark} />}
      <BubbleContainerButtons />
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
    </View>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.colorPickerBackdrop,
    flexWrap: 'wrap',
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
