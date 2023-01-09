import React, { useEffect, useState } from 'react'
import MaskInput, { MaskInputProps } from 'react-native-mask-input'
import { BaseOpacity, Box, mkUseStyles, Text, theme } from 'utils/theme'

import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native'
import DeleteIcon from 'assets/icons/icon-delete.svg'
import { useTranslation } from 'react-i18next'
import { AnimatedBox } from 'components/AnimatedBox'

type Props = {
  handleOnChange: F1<string>
  inputLabel: string
  reset: F0
  onBlur?: F0
  onFocus?: F0
  isError?: boolean
}

export const MaskedInput = (p: MaskInputProps & TextInputProps & Props) => {
  const styles = useStyles()
  const { t } = useTranslation('calendar')
  const [isFocused, setIsFocused] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const focusOpacity = useSharedValue(0)
  const progressStyle = useAnimatedStyle(() => ({
    borderWidth: withTiming(focusOpacity.value, {
      duration: 300,
    }),
  }))

  useEffect(() => {
    focusOpacity.value = isFocused || p.isError ? 0.8 : 0
  }, [focusOpacity, isFocused, p.isError])

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    p?.onBlur?.(e)
    setIsFocused(false)
  }

  const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    p?.onFocus?.(e)
    setIsFocused(true)
    setShowButton(true)
  }

  const handleClear = () => {
    p.reset()
    setShowButton(false)
  }

  return (
    <Box>
      <Text
        paddingVertical="xs"
        paddingLeft="s"
        variant="inputLabel"
        color={p.isError ? 'errorBrighter' : 'darkGrey'}>
        {p.inputLabel}
      </Text>
      <AnimatedBox
        style={[
          styles.inputContainer,
          progressStyle,
          isFocused && [styles.noBackground, styles.focusBorder],
          p.isError && styles.errorBorder,
        ]}>
        <MaskInput
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          style={styles.input}
          onChangeText={(masked) => p.handleOnChange(masked)}
          placeholderTextColor={theme.colors.headerGrey}
          {...p}
        />
        {p?.value && p?.value.length > 0 && showButton ? (
          <BaseOpacity position="absolute" right={15} onPress={handleClear}>
            <DeleteIcon width={20} height={20} color={styles.deleteIcon.color} />
          </BaseOpacity>
        ) : null}
      </AnimatedBox>
      <Box>
        {p.isError && (
          <Text paddingVertical="xs" paddingLeft="s" variant="inputLabel" color="errorBrighter">
            {t('enterValidYear')}
          </Text>
        )}
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  inputContainer: {
    backgroundColor: theme.colors.input,
    borderRadius: theme.borderRadii.lplus,
    paddingLeft: theme.spacing.xm,
    paddingRight: theme.spacing.l,
    justifyContent: 'center',
    height: 40,
  },
  noBackground: { backgroundColor: theme.colors.white },
  focusBorder: {
    borderStyle: 'solid',
    borderColor: theme.colors.inputBorder,
  },
  errorBorder: {
    borderStyle: 'solid',
    borderColor: theme.colors.errorBrighter,
  },
  input: {
    color: theme.colors.black,
    fontFamily: 'Nunito-Regular',
  },
  deleteIcon: {
    color: theme.colors.clearInputIcon,
  },
}))
