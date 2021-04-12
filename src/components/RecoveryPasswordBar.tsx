import React, { FC } from 'react'
import { Box, theme } from '../utils/theme/index'
import { AnimatedBar } from './AnimatedBar'

type RecoveryPasswordBarTypes = {
  currentScreen: string
}

export const RecoveryPasswordBar: FC<RecoveryPasswordBarTypes> = ({ currentScreen }) => (
  <Box flexDirection="row" paddingHorizontal="m">
    {currentScreen === 'RecoveryCode' ? (
      <>
        <AnimatedBar marginSide="marginRight" margin={theme.spacing.s} />
        <Box backgroundColor="lightGrey" height={4} flex={1} marginLeft="s" />
      </>
    ) : (
      <>
        <Box backgroundColor="primary" height={4} flex={1} marginRight="s" />
        <AnimatedBar marginSide="marginLeft" margin={theme.spacing.s} />
      </>
    )}
  </Box>
)
