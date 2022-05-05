import React from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { BaseOpacity, Box, Text } from 'utils/theme'
import IconArrowUp from 'assets/icons/icon-arrow-up.svg'
import { pluralizeWord } from 'utils/pluralizeWord'

type CommentBoxBtnProps = {
  quantity: number
  opened: boolean
  onPress: F0
}

export const CommentBoxBtn = ({ quantity, onPress, opened }: CommentBoxBtnProps) => {
  const rotation = useSharedValue(180)

  const rotationStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <BaseOpacity
      onPress={() => {
        rotation.value = withSpring(opened ? 180 : 0)
        onPress()
      }}
      activeOpacity={0.7}
      padding="s">
      {quantity > 0 && (
        <Box flexDirection="row" alignItems="center">
          <Text variant="captionText">{pluralizeWord('comments', quantity)}</Text>
          <Animated.View style={[rotationStyles]}>
            <IconArrowUp />
          </Animated.View>
        </Box>
      )}
    </BaseOpacity>
  )
}
