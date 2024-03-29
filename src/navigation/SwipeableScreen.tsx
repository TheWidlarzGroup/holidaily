import React, { ReactNode, useEffect, useRef } from 'react'
import { ViewProps } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BaseOpacity, mkUseStyles, Theme } from 'utils/theme'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { BoxProps } from '@shopify/restyle'
import { ModalHandleIndicator } from 'components/ModalHandleIndicator'
import { ConfirmationModalProps } from 'types/confirmationModalProps'
import IconBack from 'assets/icons/icon-back2.svg'
import { AnimatedBox } from 'components/AnimatedBox'
import { useOnGoback, useSwipeGestureHandler } from './service/swipeableScreenUtils'

const baseContainerProps: BoxProps<Theme> = {
  flex: 1,
  backgroundColor: 'white',
  overflow: 'hidden',
  marginTop: 'xxl',
  borderTopLeftRadius: 'l2min',
  borderTopRightRadius: 'l2min',
}

export type SwipeableScreenProps = {
  children: ReactNode
  swipeWithIndicator?: true
  extraStyle?: ViewProps['style']
  onDismiss?: F0
  onSwipeStart?: F0
  withBackIcon?: true
} & Omit<BoxProps<Theme>, 'style'> &
  (
    | { confirmLeave?: never; confirmLeaveOptions?: never }
    | {
        confirmLeave: boolean
        confirmLeaveOptions?: Omit<
          ConfirmationModalProps,
          'onAccept' | 'hideModal' | 'isVisible' | 'onDecline'
        >
      }
  )

const HIT_SLOP = { top: 20, bottom: 20, left: 20, right: 20 }

export const SwipeableScreen = ({
  children,
  confirmLeave,
  confirmLeaveOptions,
  swipeWithIndicator,
  extraStyle,
  onDismiss,
  onSwipeStart,
  withBackIcon,
  ...extraContainerProps
}: SwipeableScreenProps) => {
  const styles = useStyles()

  const { height } = useDimensions()
  const { goBack, ...navigation } = useNavigation()
  const translateY = useSharedValue(height)
  const isCloseTriggered = useRef(false)
  useEffect(() => {
    translateY.value = withTiming(0)
  }, [translateY])
  const gestureHandler = useSwipeGestureHandler(translateY)
  const animatedTranslation = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))
  const fadeAway = () => {
    if (!isCloseTriggered.current) {
      isCloseTriggered.current = true
      translateY.value = withTiming(height)
    }
  }
  const fadeBack = () => (translateY.value = withTiming(0))
  const onGoback = useOnGoback({
    onSuccess: fadeAway,
    onFailure: fadeBack,
    confirmLeave,
    confirmLeaveOptions,
  })
  useEffect(() => {
    const subscription = navigation.addListener('beforeRemove', (e) => onGoback(e))
    return subscription
  })

  const onSwipeEnd = () => {
    if (isCloseTriggered.current) return
    if (translateY.value > 140) {
      goBack()
      onDismiss?.()
    } else translateY.value = withTiming(0)
  }

  const containerProps = { ...baseContainerProps, ...(extraContainerProps ?? {}) }
  const containerStyle: ViewProps['style'] = [animatedTranslation, extraStyle ?? {}]
  if (swipeWithIndicator)
    return (
      <Wrapper onDismiss={onDismiss} onSwipeStart={onSwipeStart}>
        <AnimatedBox {...containerProps} style={containerStyle}>
          <PanGestureHandler
            onGestureEvent={gestureHandler}
            onEnded={() => {
              onSwipeEnd?.()
            }}
            onActivated={() => onSwipeStart?.()}>
            {withBackIcon ? (
              <AnimatedBox width="100%" paddingTop="s" flexDirection="row" height={37}>
                <BaseOpacity
                  onPress={() => goBack()}
                  style={styles.backIconWrapper}
                  hitSlop={HIT_SLOP}>
                  <IconBack height={16} width={16} color={styles.backIcon.color} />
                </BaseOpacity>
                <ModalHandleIndicator />
              </AnimatedBox>
            ) : (
              <AnimatedBox height={16} width="100%" paddingTop="s">
                <ModalHandleIndicator />
              </AnimatedBox>
            )}
          </PanGestureHandler>
          {children}
        </AnimatedBox>
      </Wrapper>
    )

  return (
    <Wrapper onDismiss={onDismiss} onSwipeStart={onSwipeStart}>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onEnded={() => onSwipeEnd()}
        onActivated={() => onSwipeStart?.()}>
        <AnimatedBox {...containerProps} style={containerStyle}>
          {children}
        </AnimatedBox>
      </PanGestureHandler>
    </Wrapper>
  )
}

type WrapperProps = { children: ReactNode; onDismiss?: F0; onSwipeStart?: F0 }

const Wrapper = ({ children, onDismiss, onSwipeStart }: WrapperProps) => {
  const { goBack } = useNavigation()
  const handleBackdropPress = () => {
    if (onSwipeStart) return onSwipeStart()
    goBack()
    onDismiss?.()
  }
  return (
    <SafeAreaWrapper edges={['top']} isDefaultBgColor>
      <BaseOpacity
        position="absolute"
        style={{ width: '100%', height: '100%' }}
        zIndex="-1"
        onPress={handleBackdropPress}
      />
      {children}
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme) => ({
  backIconWrapper: {
    position: 'absolute',
    top: theme.spacing.ml,
    left: theme.spacing.ml,
  },
  backIcon: {
    color: theme.colors.black,
  },
}))
