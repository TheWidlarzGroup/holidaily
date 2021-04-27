import React, { FC } from 'react'

import { Box, Text } from 'utils/theme/index'
import { SafeAreaWrapper } from './SafeAreaWrapper'

export const RequestVacationModal: FC = () => {
  console.log('xd')

  return (
    <SafeAreaWrapper>
      <Box backgroundColor="tertiary">
        <Text>My Modal</Text>
      </Box>
    </SafeAreaWrapper>
  )
}
