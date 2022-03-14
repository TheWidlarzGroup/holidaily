import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import CloseIcon from 'assets/icons/icon-close.svg'
import { Box, Text, mkUseStyles, BaseOpacity, Theme } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { useTranslation } from 'react-i18next'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { SafeAreaView } from 'react-native-safe-area-context'
import Policies from './Policies'

const Background = require('assets/policy_modal_background.png')

export const PtoPolicy = () => {
  const { height } = useDimensions()
  const { goBack } = useNavigation()
  const { t } = useTranslation('budget')
  const styles = useStyles()
  const swipeValue = useSharedValue(height)
  const isCloseTriggered = useRef(false)
  useEffect(() => {
    swipeValue.value = withTiming(0)
  }, [swipeValue])

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetY: number
      offsetX: number
    }
  >({
    onStart: (_, ctx) => {
      ctx.offsetY = swipeValue.value
    },
    onActive: (event, ctx) => {
      if (ctx.offsetY + event.translationY < 0) swipeValue.value = 0
      else swipeValue.value = ctx.offsetY + event.translationY
    },
  })

  const animatedTranslation = useAnimatedStyle(() => ({
    transform: [{ translateY: swipeValue.value }],
  }))

  const closeModal = () => {
    // closeModal is fired twice on BaseOpacity press
    if (!isCloseTriggered.current) {
      isCloseTriggered.current = true
      swipeValue.value = withTiming(height)
      goBack()
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onEnded={() => {
          if (swipeValue.value > 140) {
            closeModal()
          } else swipeValue.value = withTiming(0)
        }}>
        <Animated.View style={[styles.container, animatedTranslation]}>
          <Box flexDirection="row" alignItems="center" paddingHorizontal="s">
            <BaseOpacity onPress={closeModal}>
              <CloseIcon width={50} height={50} />
            </BaseOpacity>
            <Box flex={1}>
              <Text variant="boldBlackCenter20">{t('policyHeader')}</Text>
            </Box>
          </Box>
          <Policies />
          <FastImage style={[styles.background]} source={Background} />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    overflow: 'visible',
    zIndex: theme.zIndices['-1'],
  },
}))
