import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

export const Dashboard: FC = () => (
  <SafeAreaWrapper>
    <Box margin="xl">
      <Text variant="title1">Welcome in dashboard</Text>
    </Box>
  </SafeAreaWrapper>
)
