import React, { FC } from 'react'
import { Box } from 'utils/theme/index'
import { AnimatedBar } from './AnimatedBar'

type RecoveryPasswordBarTypes = {
  currentScreen: 'RecoveryCode' | 'NewPassword'
}

export const RecoveryPasswordBar: FC<RecoveryPasswordBarTypes> = ({ currentScreen }) => (
  <Box flexDirection="row" paddingHorizontal="m">
    {currentScreen === 'RecoveryCode' ? (
      <>
        <AnimatedBar marginRight="s" />
        <Box backgroundColor="lightGrey" height={4} flex={1} marginLeft="s" />
      </>
    ) : (
      <>
        <Box backgroundColor="tertiary" height={4} flex={1} marginRight="s" />
        <AnimatedBar marginLeft="s" />
      </>
    )}
  </Box>
)
