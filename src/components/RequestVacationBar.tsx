import React, { useRef } from 'react'
import { Box } from 'utils/theme/index'
import { AnimatedBar } from './AnimatedBar'

type RequestVacationBarProps = {
  currentScreen: 'Form' | 'Summary'
}

export const RequestVacationBar = ({ currentScreen }: RequestVacationBarProps) => {
  const { current: initialScreen } = useRef(currentScreen)

  return (
    <Box flexDirection="row" paddingHorizontal="m">
      <AnimatedBar marginRight="s" isActive />
      <AnimatedBar
        disableInitialAnimation
        reverseAnimation={currentScreen === initialScreen}
        isActive={currentScreen === 'Summary'}
        marginLeft="s"
      />
    </Box>
  )
}
