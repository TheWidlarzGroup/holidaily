import React, { FC } from 'react'
import { StyleSheet, TextInput, Pressable, TextInputProps } from 'react-native'
import { Text, Box, theme } from '../utils/theme/index'
import { colors } from '../utils/theme/colors'

import useBooleanState from '../hooks/useBooleanState'
import IconTogglePasswordVisibility from '../assets/icons/icon-togglePassword.svg'

type CustomInputTypes = {
  inputText: string
  value: string
  isWrong: boolean
  forwardRef?: React.Ref<TextInput>
}

export const CustomInput: FC<CustomInputTypes & TextInputProps> = ({
  inputText,
  onChange,
  onBlur,
  value,
  isWrong,
  forwardRef,
  ...props
}) => {
  const [state, { toggle }] = useBooleanState(inputText === 'Password')

  return (
    <>
      <Text variant="label1" marginLeft="m" marginBottom="xs">
        {inputText}
      </Text>
      <Box flexDirection="row">
        <TextInput
          style={[styles.input, isWrong && styles.errorBorder]}
          secureTextEntry={state}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          ref={forwardRef}
          {...props}
        />
        {inputText === 'Password' && (
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
