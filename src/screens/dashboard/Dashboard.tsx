import React, { FC, useEffect } from 'react'
import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Loader } from 'components/Loader'
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

export const Dashboard: FC = () => {
  const progress = useSharedValue(0)
  useEffect(() => {
    progress.value = withRepeat(withTiming(150, { duration: 1000 }), -1, true)
  }, [progress])

  return (
    <SafeAreaWrapper>
      <Box margin="xl">
        <Text variant="title1">Welcome in dashboard</Text>
      </Box>
      <Box alignItems="center" backgroundColor="primary">
        <Loader progress={progress.value} />
      </Box>
    </SafeAreaWrapper>
  )
}
