import React, { useEffect, useState } from 'react'
import MaskInput, { MaskInputProps } from 'react-native-mask-input'
import { BaseOpacity, Box, mkUseStyles, theme } from 'utils/theme'

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native'
import DeleteIcon from 'assets/icons/icon-delete.svg'

interface Props {
  handleOnChange: F1<string>
  onBlur?: F0
  onFocus?: F0
  reset?: F0
}

export const MaskedInput = (p: MaskInputProps & TextInputProps & Props) => {
  const styles = useStyles()

  const [isFocused, setIsFocused] = useState(false)

  const focusOpacity = useSharedValue(0)

  const progressStyle = useAnimatedStyle(() => ({
    borderWidth: withTiming(focusOpacity.value, {
      duration: 300,
    }),
  }))

  useEffect(() => {
    focusOpacity.value = isFocused ? 0.8 : 0
  }, [focusOpacity, isFocused])

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    p?.onBlur?.(e)
    setIsFocused(false)
  }

  const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    p?.onFocus?.(e)
    setIsFocused(true)
  }

  return (
    <Animated.View
      style={[
        styles.container,
        styles.containerHeight,
        progressStyle,
        isFocused && [styles.noBackground, styles.focusBorder],
      ]}>
      <MaskInput
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        style={styles.input}
        onChangeText={(masked) => p.handleOnChange(masked)}
        placeholderTextColor={theme.colors.headerGrey}
        {...p}
      />
      {p?.reset && p?.value && p?.value.length > 0 && isFocused ? (
        <BaseOpacity position="absolute" right={15} onPress={p?.reset}>
          <DeleteIcon width={20} height={20} />
        </BaseOpacity>
      ) : null}
    </Animated.View>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.input,
    borderRadius: theme.borderRadii.lplus,
    paddingLeft: theme.spacing.xm,
    paddingRight: theme.spacing.l,
    justifyContent: 'center',
  },
  containerHeight: {
    // height: 40,
  },
  noBackground: { backgroundColor: theme.colors.white },
  focusBorder: {
    borderStyle: 'solid',
    borderColor: theme.colors.inputBorder,
  },
  input: {
    // paddingVertical: 0,
    color: theme.colors.black,
    fontFamily: 'Nunito-Regular',
  },
}))
