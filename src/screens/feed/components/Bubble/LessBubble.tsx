import React from 'react'
import { Text } from 'utils/theme'
import { Bubble } from './Bubble'

type BubbleProps = { onPress: F0 }

export const LessBubble = ({ onPress }: BubbleProps) => (
  <Bubble
    margin="xs"
    onPress={() => onPress()}
    borderColor="transparent"
    borderWidth={1.2}
    height={42}>
    <Text padding="s" variant="primaryBold12" color="black">
      Show less
    </Text>
  </Bubble>
)
