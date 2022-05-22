import React from 'react'

import { Box, Text } from 'utils/theme'
import { BorderlessButton } from 'react-native-gesture-handler'

type SliderItemProps = {
  title: string
  toggleItemSelection: () => void
}

export const SliderItem = ({ title, toggleItemSelection }: SliderItemProps) => (
  <Box backgroundColor="special" marginHorizontal="xs" borderRadius="l">
    <BorderlessButton borderless={false} onPress={toggleItemSelection}>
      <Box paddingHorizontal="m" paddingVertical="s">
        <Text color="alwaysWhite" variant="buttonSM">
          {title}
        </Text>
      </Box>
    </BorderlessButton>
  </Box>
)
