import React from 'react'
import { ModalProps } from 'react-native-modal'
import { mkUseStyles, Theme, Box } from 'utils/theme'
import Animated, { useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { RequestSentButtons } from './RequestSent/RequestSentButtons'
import { RequestSentInfo } from './RequestSent/RequestSentInfo'
import { RequestSentImage } from './RequestSent/RequestSentImage'

type RequestSentProps = Pick<ModalProps, 'isVisible'> & {
  onPressSee: F0
  onPressAnother: F0
  onPressOk: F0
}

export const RequestSent = ({ isVisible, ...buttonPressHandlers }: RequestSentProps) => {
  const styles = useStyles()
  const { height } = useDimensions()
  const progress = useDerivedValue(() => (isVisible ? 1 : 0), [isVisible])

  const animatedModalStyles = useAnimatedStyle(() => {
    const v = progress.value
    const h = height
    return {
      transform: [{ translateY: withSpring((1 - v) * h, { overshootClamping: true }) }],
      opacity: withSpring(v, { overshootClamping: true }),
    }
  }, [])

  if (!isVisible) return null

  return (
    <Animated.View style={[styles.modal, animatedModalStyles]}>
      <Box
        alignItems="center"
        paddingHorizontal="xxl"
        flex={1}
        paddingBottom="xl"
        justifyContent="flex-end">
        <RequestSentImage />
        <RequestSentInfo />
        <RequestSentButtons {...buttonPressHandlers} />
      </Box>
    </Animated.View>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: -5,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
}))
