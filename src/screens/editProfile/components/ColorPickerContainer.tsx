import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import { Box } from 'utils/theme'
import { Bubble } from './Bubble'

type ColorProps = {
  id: number
  color: string
}
const COLORS: ColorProps[] = [
  {
    color: 'red',
    id: 1,
  },
  {
    color: 'blue',
    id: 2,
  },
]

export const ColorPickerContainer = () => {
  const { height, width } = useWindowDimensions()
  console.log(height, width)

  return (
    <View style={{ flex: 1, backgroundColor: 'white', flexWrap: 'wrap' }}>
      {COLORS.map(({ color, id }) => (
        <Box position="absolute" key={id}>
          <Bubble color={color} />
        </Box>
      ))}
    </View>
  )
}
