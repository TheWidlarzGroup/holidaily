import React from 'react'
import { useWindowDimensions } from 'react-native'
import Checkmark from 'components/Checkmark'
import { Box, mkUseStyles, theme } from 'utils/theme'
import { BUBBLE_CONSTANTS as C } from './BubbleHelper'

type CheckMarkProps = {
  animateCheckmark: boolean
}

export const CheckMark = ({ animateCheckmark }: CheckMarkProps) => {
  const styles = useStyles()
  const { width, height } = useWindowDimensions()
  const checkmarkCenter = {
    x: width / 2 - C.CHECKMARK_BOX_SIZE / 2,
    y: height / 2 - C.CHECKMARK_BOX_SIZE / 2,
  }

  return (
    <Box
      style={styles.scaleCheckmark}
      position="absolute"
      top={checkmarkCenter.y}
      left={checkmarkCenter.x}
      width={C.CHECKMARK_BOX_SIZE}
      height={C.CHECKMARK_BOX_SIZE}
      alignItems="center"
      justifyContent="center"
      backgroundColor="transparent"
      zIndex="10">
      <Checkmark
        width={10}
        start={animateCheckmark}
        color={theme.colors.white}
        onFinish={() => {}}
      />
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  scaleCheckmark: {
    transform: [{ scale: 2 }],
  },
}))
