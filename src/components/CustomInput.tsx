import React, { FC } from 'react'
import { StyleSheet, TextInput, Pressable } from 'react-native'
import { Text, Box, theme } from '../utils/theme/index'
import { colors } from '../utils/theme/colors'
import { IconTogglePasswordVisibility } from '../assets/IconTogglePasswordVisbility'

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
}) => {
  const [passwordVisbility, setPasswordVisibility] = React.useState(inputText === 'Password')

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisbility)
  }

  return (
    <>
      <Text variant="label1" marginLeft="m" marginBottom="xs">
        {inputText}
      </Text>
      <Box flexDirection="row">
        <TextInput
          style={[styles.input, isWrong && styles.errorBorder]}
          secureTextEntry={passwordVisbility}
          onBlur={onBlur}
          onChangeText={(newValue) => onChange(newValue)}
          value={value}
        />
        {inputText === 'Password' && (
          <Box alignSelf="center" position="absolute" right={17}>
            <Pressable onPress={togglePasswordVisibility}>
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
