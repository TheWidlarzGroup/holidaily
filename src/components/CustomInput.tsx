import React, { FC } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Text } from '../utils/theme/index'

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
    {/* ikona widocznosci hasla dla inputow hasla, do dodania */}
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
    backgroundColor: '#E1E1E1',
    borderRadius: 100,
    paddingHorizontal: 20,
  },

  errorBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
  },
})
