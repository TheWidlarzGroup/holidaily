import React, { FC, useRef } from 'react'
import { Box, theme } from 'utils/theme/index'
import { AnimatedBar } from './AnimatedBar'

type RequestVacationBarTypes = {
  currentScreen: 'Form' | 'Summary'
  reverseBarAnimation?: boolean
}

export const RequestVacationBar: FC<RequestVacationBarTypes> = ({ currentScreen }) => {
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
