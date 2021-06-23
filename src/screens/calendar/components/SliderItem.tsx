import React from 'react'

import { Box, Text } from 'utils/theme'
import { BorderlessButton } from 'react-native-gesture-handler'

type SliderItemProps = {
  title: string
  isSelected: boolean
  toggleItemSelection: () => void
}

export const SliderItem = ({ title, isSelected, toggleItemSelection }: SliderItemProps) => (
  <Box backgroundColor={isSelected ? 'black' : 'white'} marginHorizontal="xs" borderRadius="l">
    <BorderlessButton borderless={false} onPress={toggleItemSelection}>
      <Box paddingHorizontal="m" paddingVertical="s">
        <Text color={isSelected ? 'white' : 'black'} fontFamily="Nunito-Bold" fontSize={18}>
          {title}
        </Text>
      </Box>
    </BorderlessButton>
  </Box>
)
