import React from 'react'
import { BaseOpacity, Text } from 'utils/theme'

type GoUpDownButtonProps = {
  onPress: F0
}

export const GoUpDownButton = (props: GoUpDownButtonProps) => (
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
    onPress={() => props.onPress()}>
    <Text color="alwaysWhite">X</Text>
  </BaseOpacity>
)
