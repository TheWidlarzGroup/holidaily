import React, { PropsWithChildren, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import CheckIcon from 'assets/icons/icon-check.svg'
import { useMarkNotificationAsSeen } from 'dataAccess/mutations/useMarkNotificationAsSeen'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const AnimatedBox = Animated.createAnimatedComponent(Box)
export const SwipeableNotification = ({
  children,
  notificationId,
}: PropsWithChildren<{ notificationId: string }>) => {
  const opacity = useSharedValue(1)
  const { mutate } = useMarkNotificationAsSeen()
  const markAsSeen = () => {
    opacity.value = withTiming(0)
    mutate(notificationId)
  }
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))
  const LeftActions = useCallback(
    () => (
      <AnimatedBox
        style={animatedOpacity}
        backgroundColor="primary"
        marginBottom="m"
        borderRadius="lmin"
        height={88}
        width="100%">
        <SwipeBar />
      </AnimatedBox>
    ),
    [animatedOpacity]
  )

  return (
    <Swipeable renderLeftActions={LeftActions} onSwipeableOpen={markAsSeen} leftThreshold={80}>
      {children}
    </Swipeable>
  )
}

const SwipeBar = () => {
  const { t } = useTranslation('notifications')
  const theme = useTheme()
  return (
    <BaseOpacity
      width="100%"
      height="100%"
      flexDirection="row"
      alignItems="center"
      paddingHorizontal="l">
      <Box marginRight="s">
        <CheckIcon width={12} height={12} color={theme.colors.alwaysWhite} />
      </Box>

      <Text variant="textBoldSM" color="alwaysWhite" lineHeight={21}>
        {t('markSeen')}
      </Text>
    </BaseOpacity>
  )
}
