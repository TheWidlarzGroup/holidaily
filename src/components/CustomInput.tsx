import React, { FC } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Text, theme } from '../utils/theme/index'
import { colors } from '../utils/theme/colors'

type CustomInputTypes = {
  inputText: string
  onChange: (newValue: string) => void
  onBlur: () => void
  value: string
  isWrong: boolean
}

export const CustomInput: FC<CustomInputTypes> = ({
  inputText,
  onChange,
  onBlur,
  value,
  isWrong,
}) => (
  <>
    <Text variant="label1" marginLeft="m" marginBottom="xs">
      {inputText}
    </Text>
    {/* Password visibility icon to be added */}
    <TextInput
      style={[styles.input, isWrong && styles.errorBorder]}
      secureTextEntry={inputText === 'Password'}
      onBlur={onBlur}
      onChangeText={(newValue) => onChange(newValue)}
      value={value}
    />
  </>
)

const styles = StyleSheet.create({
  input: {
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
