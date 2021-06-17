import React, { FC } from 'react'
import { Box, theme } from 'utils/theme/index'
import { AnimatedBar } from './AnimatedBar'

type RequestVacationBarTypes = {
  currentScreen: 'Form' | 'Summary'
}

export const RequestVacationBar: FC<RequestVacationBarTypes> = ({ currentScreen }) => (
  <Box flexDirection="row" paddingHorizontal="m">
    {currentScreen === 'Form' ? (
      <>
        <AnimatedBar marginSide="marginRight" margin={theme.spacing.s} />
        <Box backgroundColor="lightGrey" height={4} flex={1} marginLeft="s" />
      </>
    ) : (
      <>
        <Box backgroundColor="tertiary" height={4} flex={1} marginRight="s" />
        <AnimatedBar marginSide="marginLeft" margin={theme.spacing.s} />
      </>
    )}
  </Box>
)
