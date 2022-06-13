import React from 'react'
import { BaseOpacity, Text } from 'utils/theme'

export const GoUpDownButton = () => (
  <BaseOpacity
    width={40}
    height={40}
    position="absolute"
    bottom={84}
    right={24}
    backgroundColor="special"
    borderRadius="full"
    justifyContent="center"
    alignItems="center"
    onPress={() => console.log('pressed')}>
    <Text color="alwaysWhite">X</Text>
  </BaseOpacity>
)
