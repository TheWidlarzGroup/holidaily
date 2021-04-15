import React, { forwardRef, useEffect } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, TextInputProps } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import IconTogglePasswordVisibility from 'assets/icons/icon-togglePassword.svg'
import { Text, Box, theme } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'
import useBooleanState from 'hooks/useBooleanState'

type CustomInputTypes = {
  inputLabel: string
  isError: boolean
  isPasswordIconVisible?: boolean
}

export const CustomInput = forwardRef<TextInput, CustomInputTypes & TextInputProps>(
  ({ inputLabel, onChange, onBlur, value, isError, isPasswordIconVisible, ...props }, ref) => {
    const [isPasswordInput, { toggle }] = useBooleanState(
      inputLabel === 'Password' || inputLabel === 'Confirm new password'
    )

    const errorOpacity = useSharedValue(0)

    const progressStyle = useAnimatedStyle(() => ({
      borderWidth: withTiming(errorOpacity.value, {
        duration: 300,
      }),
    }))

    useEffect(() => {
      errorOpacity.value = isError ? 2 : 0
    }, [isError])

    return (
      <>
        <Text variant="label1" marginLeft="m" marginBottom="xs">
          {inputLabel}
        </Text>
        <Box flexDirection="row">
          <Animated.View style={[styles.input, styles.errorBorder, progressStyle]}>
            <TextInput
              secureTextEntry={isPasswordInput}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              ref={ref}
              {...props}
            />
          </Animated.View>
          {isPasswordIconVisible && (
            <Box alignSelf="center" position="absolute" right={17}>
              <TouchableOpacity onPress={toggle}>
                <IconTogglePasswordVisibility />
              </TouchableOpacity>
            </Box>
          )}
        </Box>
      </>
    )
  }
)

CustomInput.displayName = 'CustomInput'

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    backgroundColor: colors.lightGrey,
    borderRadius: theme.borderRadii.xxl,
    paddingHorizontal: theme.spacing.m,
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
})
