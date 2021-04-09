import React, { FC, useState } from 'react'
import { StyleSheet, TextInput, Pressable } from 'react-native'
import { Text, Box, theme } from '../utils/theme/index'
import { colors } from '../utils/theme/colors'
import { IconTogglePasswordVisibility } from '../assets/IconTogglePasswordVisbility'
import useBooleanState from '../hooks/useBooleanState'

type CustomInputTypes = {
  inputText: string
  onChange: (newValue: string) => void
  onBlur: () => void
  value: string
  isWrong: boolean
  passwordVisibilityIcon?: boolean
}

export const CustomInput: FC<CustomInputTypes> = ({
  inputText,
  onChange,
  onBlur,
  value,
  isWrong,
  passwordVisibilityIcon,
}) => {
  const [state, { toggle }] = useBooleanState(inputText === 'Password')
  const [isFocused, setIsFocused] = useState(false)

  const handleOnBlur = () => {
    onBlur()
    setIsFocused(false)
  }

  return (
    <>
      <Text variant="label1" marginLeft="m" marginBottom="xs">
        {inputText}
      </Text>
      <Box flexDirection="row">
        <TextInput
          style={[
            styles.input,
            isWrong && styles.errorBorder,
            !isWrong && isFocused && styles.border,
          ]}
          secureTextEntry={state}
          onBlur={handleOnBlur}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          value={value}
        />
        {passwordVisibilityIcon && (
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
  border: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.black,
  },
})
