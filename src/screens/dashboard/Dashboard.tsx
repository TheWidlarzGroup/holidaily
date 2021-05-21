import React, { FC, useEffect } from 'react'
import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Loader } from 'components/Loader'
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { colors } from 'utils/theme/colors'

export const Dashboard: FC = () => (
  <SafeAreaWrapper isDefaultBgColor>
    <Box margin="xl">
      <Text variant="title1">Welcome in dashboard</Text>
    </Box>
  </SafeAreaWrapper>
)
