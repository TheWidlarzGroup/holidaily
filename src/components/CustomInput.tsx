import React, { forwardRef, useEffect } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, TextInputProps } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import IconTogglePasswordVisibility from 'assets/icons/icon-togglePassword.svg'
import IconEdit from 'assets/icons/icon-edit-grey.svg'
import { Text, Box, theme } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'
import { useBooleanState } from 'hooks/useBooleanState'

type CustomInputTypes = {
  inputLabel: string
  isError: boolean
  isPasswordIconVisible?: boolean
  isEditIconVisible?: boolean
}

export const CustomInput = forwardRef<TextInput, CustomInputTypes & TextInputProps>(
  (
    {
      inputLabel,
      onChange,
      onBlur,
      value,
      isError,
      isPasswordIconVisible,
      isEditIconVisible,
      ...props
    },
    ref
  ) => {
    const [isPasswordInput, { toggle }] = useBooleanState(!!isPasswordIconVisible)

    const errorOpacity = useSharedValue(0)

    const progressStyle = useAnimatedStyle(() => ({
      borderWidth: withTiming(errorOpacity.value, {
        duration: 300,
      }),
    }))

    const editInput = () => {
      console.log('edit input')
      // TODO: focus selected input
    }

    useEffect(() => {
      errorOpacity.value = isError ? 2 : 0
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {isEditIconVisible && (
            <Box
              alignSelf="center"
              position="absolute"
              right={0}
              borderWidth={4}
              borderColor="white"
              borderRadius="l">
              <TouchableOpacity onPress={editInput}>
                <IconEdit style={{ width: 50, height: 50 }} />
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
