import React, { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import IconArrowUp from 'assets/icons/icon-arrow-up.svg'
import { pluralizeWord } from 'utils/pluralizeWord'

type CommentBoxBtnProps = {
  quantity: number
  opened: boolean
  onPress: F0
}

export const CommentBoxBtn = ({ quantity, onPress, opened }: CommentBoxBtnProps) => {
  const rotation = useSharedValue(180)
  const theme = useTheme()
  const rotationStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  useEffect(() => {
    rotation.value = opened ? withSpring(180) : withSpring(0)
  }, [opened, rotation])

  return (
    <BaseOpacity onPress={onPress} activeOpacity={0.7} padding="s" paddingBottom="xs">
      {quantity > 0 && (
        <Box flexDirection="row" alignItems="center">
          <Text variant="captionText" paddingVertical="s">
            {pluralizeWord('comments', quantity)}
          </Text>
          {quantity > 1 && (
            <Animated.View style={[rotationStyles]}>
              <IconArrowUp color={theme.colors.black} />
            </Animated.View>
          )}
        </Box>
      )}
    </BaseOpacity>
  )
}
