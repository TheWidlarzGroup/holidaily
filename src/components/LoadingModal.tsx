import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { useBooleanState } from 'hooks/useBooleanState'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { mkUseStyles, Text, useColors } from 'utils/theme'
import { Loader } from './Loader'

type LoadingModalProps = {
  show: boolean
  showText?: true
  style?: StyleProp<ViewStyle>
}

export const LoadingModal = ({ show, showText, style }: LoadingModalProps) => {
  const loaderProgress = useSharedValue<number>(0)
  const [hidden, { setTrue: setHiddenTrue, setFalse: setHiddenFalse }] = useBooleanState(!show)
  const styles = useStyles()
  const colors = useColors()
  const { height } = useDimensions()
  const { t } = useTranslation('loader')

  const showProgress = useDerivedValue(() => (show ? 1 : 0), [show])

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: withTiming(showProgress.value, { duration: 200 }),
  }))

  useEffect(() => {
    loaderProgress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, false)
  }, [loaderProgress])

  useEffect(() => {
    if (show === true) setHiddenFalse()
    else
      setTimeout(() => {
        setHiddenTrue()
      }, 1000)
  }, [show, setHiddenFalse, setHiddenTrue])

  if (!show && hidden) return null
  return (
    <Animated.View style={[styles.container, { height: height + 120 }, style, animatedOpacity]}>
      <Loader
        progress={loaderProgress}
        size={40}
        frontLayerColor={colors.secondary}
        backLayerColor={colors.lightGrey}
        strokeWidth={4}
      />
      {showText && (
        <Text variant="boldOrange15" marginTop="l">
          {t('wait')}
        </Text>
      )}
    </Animated.View>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.loader,
    position: 'absolute',
    left: -50,
    right: -50,
    bottom: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
