import React, { forwardRef, useEffect, useRef, useState } from 'react'
import {
  TextInput,
  TouchableOpacity,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import DeleteIcon from 'assets/icons/icon-delete.svg'
import IconPasswordVisibile from 'assets/icons/icon-togglePassword.svg'
import IconPasswordInvisibile from 'assets/icons/icon-password-invisible.svg'
import { Text, Box, mkUseStyles, BaseOpacity, useTheme } from 'utils/theme/index'
import { useBooleanState } from 'hooks/useBooleanState'
import { InputEditIcon } from './InputEditIcon'

type CustomInputTypes = {
  inputLabel: string
  isError: boolean
  variant: 'medium' | 'small' | 'mediumSpecial'
  isPasswordIconVisible?: boolean
  hasValueChanged?: boolean
  disabled?: boolean
  reset?: F0
  hasButton?: boolean
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
      disabled = false,
      placeholder,
      variant,
      reset,
      hasButton,
      ...props
    },
    ref
  ) => {
    const [isPasswordInput, { toggle }] = useBooleanState(!!isPasswordIconVisible)
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<TextInput>(null)

    const styles = useStyles()
    const theme = useTheme()

    const errorOpacity = useSharedValue(0)
    const progressStyle = useAnimatedStyle(() => ({
      borderWidth: withTiming(errorOpacity.value, {
        duration: 300,
      }),
    }))

    useEffect(() => {
      errorOpacity.value = isError || isFocused ? 0.8 : 0
    }, [errorOpacity, isError, isFocused])

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
        <Text variant="inputLabel" marginLeft="s" marginBottom="xs" color="darkGreyBrighter">
          {inputLabel}
        </Text>
        <Box flexDirection="row">
          <Animated.View
            style={[
              styles.container,
              progressStyle,
              isFocused && [styles.noBackground, styles.focusBorder],
              isError && styles.errorBorder,
              variant === 'small' && styles.leftPadding,
            ]}>
            <TextInput
              style={[styles.input, disabled && styles.disabled]}
              secureTextEntry={isPasswordInput}
              onBlur={handleOnBlur}
              onChange={onChange}
              onFocus={handleOnFocus}
              value={value}
              ref={ref || inputRef}
              placeholder={(!isFocused && placeholder) || ''}
              placeholderTextColor={theme.colors.headerGrey}
              editable={!disabled}
              {...props}
            />

            {reset && value && value.length > 0 && isFocused ? (
              <BaseOpacity position="absolute" right={15} onPress={reset}>
                <DeleteIcon width={20} height={20} />
              </BaseOpacity>
            ) : null}
          </Animated.View>
          {hasButton && !isFocused && (
            <InputEditIcon
              onPress={() => {
                setIsFocused(true)
                inputRef?.current?.focus()
              }}
            />
          )}
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
  container: {
    flex: 1,
    backgroundColor: theme.colors.input,
    borderRadius: theme.borderRadii.lplus,
    paddingLeft: theme.spacing.xm,
    paddingRight: theme.spacing.l,
    justifyContent: 'center',
    height: 40,
  },
  noBackground: { backgroundColor: theme.colors.white },
  leftPadding: { paddingLeft: theme.spacing.l2plus },
  focusBorder: {
    borderStyle: 'solid',
    borderColor: theme.colors.inputBorder,
  },
  errorBorder: {
    borderStyle: 'solid',
    borderColor: theme.colors.errorRed,
  },
  input: {
    paddingVertical: 6,
    color: theme.colors.black,
    fontFamily: 'Nunito-Regular',
  },
  disabled: {
    color: theme.colors.greyDark,
  },
}))
