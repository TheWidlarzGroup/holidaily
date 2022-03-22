import React, { forwardRef, useEffect, useState } from 'react'
import {
  TextInput,
  TouchableOpacity,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import IconPasswordVisibile from 'assets/icons/icon-togglePassword.svg'
import IconPasswordInvisibile from 'assets/icons/icon-password-invisible.svg'
import { Text, Box, mkUseStyles } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'
import { useBooleanState } from 'hooks/useBooleanState'
import { textVariants } from 'utils/theme/textVariants'

type CustomInputTypes = {
  inputLabel: string
  isError: boolean
  isPasswordIconVisible?: boolean
  disabled?: boolean
  labelTextVariant?: keyof typeof textVariants
  inputTextVariant?: 'bold'
}

export const CustomInput = forwardRef<TextInput, CustomInputTypes & TextInputProps>(
  (
    {
      inputLabel,
      onChange,
      onBlur,
      onFocus,
      value,
      isError,
      isPasswordIconVisible,
      labelTextVariant,
      inputTextVariant,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isPasswordInput, { toggle }] = useBooleanState(!!isPasswordIconVisible)
    const [isFocused, setIsFocused] = useState(false)

    const styles = useStyles()

    const errorOpacity = useSharedValue(0)
    const borderColor = useSharedValue('black')

    const progressStyle = useAnimatedStyle(() => ({
      borderWidth: withTiming(errorOpacity.value, {
        duration: 300,
      }),
      borderColor: withTiming(borderColor.value, {
        duration: 300,
      }),
    }))

    useEffect(() => {
      errorOpacity.value = isError || isFocused ? 2 : 0
      borderColor.value = isFocused ? 'black' : 'red'
    }, [borderColor, errorOpacity, isError, isFocused])

    const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur?.(e)
      setIsFocused(false)
    }
    const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus?.(e)
      setIsFocused(true)
    }

    return (
      <>
        <Text variant={labelTextVariant || 'label1'} marginLeft="m" marginBottom="xs">
          {inputLabel}
        </Text>
        <Box flexDirection="row">
          <Animated.View style={[styles.input, progressStyle]}>
            <TextInput
              style={[disabled && styles.disabled, inputTextVariant === 'bold' && styles.boldText]}
              secureTextEntry={isPasswordInput}
              onBlur={handleOnBlur}
              onChange={onChange}
              onFocus={handleOnFocus}
              value={value}
              ref={ref}
              editable={!disabled}
              {...props}
            />
          </Animated.View>
          {isPasswordIconVisible && (
            <Box alignSelf="center" position="absolute" right={17}>
              <TouchableOpacity onPress={toggle}>
                {isPasswordInput ? <IconPasswordInvisibile /> : <IconPasswordVisibile />}
              </TouchableOpacity>
            </Box>
          )}
        </Box>
      </>
    )
  }
)

CustomInput.displayName = 'CustomInput'

const useStyles = mkUseStyles((theme) => ({
  input: {
    flex: 1,
    height: 50,
    backgroundColor: colors.lightGrey,
    borderRadius: theme.borderRadii.xxl,
    paddingHorizontal: theme.spacing.m,
    justifyContent: 'center',
  },

  errorBorder: {
    borderStyle: 'solid',
    borderColor: colors.errorRed,
  },
  border: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.black,
  },
  disabled: {
    color: colors.greyDark,
  },
  boldText: { fontFamily: 'Nunito-Bold', fontSize: 16, color: 'black' },
}))
