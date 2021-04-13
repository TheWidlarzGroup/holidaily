import React, { forwardRef } from 'react'
import { StyleSheet, TextInput, Pressable, TextInputProps } from 'react-native'
import IconTogglePasswordVisibility from 'assets/icons/icon-togglePassword.svg'
import { Text, Box, theme } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'

import useBooleanState from 'hooks/useBooleanState'

type CustomInputTypes = {
  inputLabel: string
  isError: boolean
}

export const CustomInput = forwardRef<TextInput, CustomInputTypes & TextInputProps>(
  ({ inputLabel, onChange, onBlur, value, isError, ...props }, ref) => {
    const [state, { toggle }] = useBooleanState(inputLabel === 'Password')

    return (
      <>
        <Text variant="label1" marginLeft="m" marginBottom="xs">
          {inputLabel}
        </Text>
        <Box flexDirection="row">
          <TextInput
            style={[styles.input, isError && styles.errorBorder]}
            secureTextEntry={state}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            ref={ref}
            {...props}
          />
          {inputLabel === 'Password' && (
            <Box alignSelf="center" position="absolute" right={17}>
              <Pressable onPress={toggle}>
                <IconTogglePasswordVisibility />
              </Pressable>
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
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.errorRed,
  },
})
