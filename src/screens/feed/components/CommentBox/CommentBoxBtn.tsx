import React from 'react'
import { useTranslation } from 'react-i18next'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { BaseOpacity, Box, Text } from 'utils/theme'

import IconArrowUp from 'assets/icons/icon-arrow-up.svg'

type CommentBoxBtnProps = {
  quantity: number
  opened: boolean
  onPress: F0
}
const setRotationValue = (cond: boolean) => (cond ? 180 : 0)

export const CommentBoxBtn = ({ quantity, onPress, opened }: CommentBoxBtnProps) => {
  const { t } = useTranslation('feed')

  const rotation = useSharedValue(setRotationValue(opened))

  const rotationStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <BaseOpacity
      onPress={() => {
        rotation.value = withSpring(setRotationValue(opened))
        onPress()
      }}
      activeOpacity={0.7}
      padding="s">
      {quantity > 0 && (
        <Box flexDirection="row" alignItems="center">
          <Text variant="captionText">
            {quantity} {t('comments')}
          </Text>
          <Animated.View style={[rotationStyles]}>
            <IconArrowUp />
          </Animated.View>
        </Box>
      )}
    </BaseOpacity>
  )
}
