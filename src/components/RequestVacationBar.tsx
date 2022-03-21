import React, { useRef } from 'react'
import { Box, theme } from 'utils/theme/index'
import { AnimatedBar } from './AnimatedBar'

type RequestVacationBarProps = {
  currentScreen: 'Form' | 'Summary'
}

export const RequestVacationBar = ({ currentScreen }: RequestVacationBarProps) => {
  const { current: initialScreen } = useRef(currentScreen)

  return (
    <Box flexDirection="row" paddingHorizontal="m">
      <AnimatedBar marginSide="marginRight" margin={theme.spacing.s} />
      <AnimatedBar
        disableInitialAnimation
        reverseAnimation={currentScreen === initialScreen}
        marginSide="marginLeft"
        margin={theme.spacing.s}
      />
    </Box>
  )
}
