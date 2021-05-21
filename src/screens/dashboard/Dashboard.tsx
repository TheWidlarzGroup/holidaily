import React, { FC, useEffect } from 'react'
import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Loader } from 'components/Loader'
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { colors } from 'utils/theme/colors'

export const Dashboard: FC = () => {
  const progress = useSharedValue<number>(0)

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, false)
  }, [progress])

  return (
    <SafeAreaWrapper>
      <Box margin="xl">
        <Text variant="title1">Welcome in dashboard</Text>
      </Box>
      <Box alignItems="center" backgroundColor="primary">
        <Loader
          progress={progress}
          size={40}
          strokeWidth={6}
          backLayerColor={colors.disabled}
          frontLayerColor={colors.white}
        />
      </Box>
    </SafeAreaWrapper>
  )
}
