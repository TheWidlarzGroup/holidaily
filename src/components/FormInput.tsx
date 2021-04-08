import React, { FC } from 'react'
import { TextInputProps, TextInput } from 'react-native'
import { Controller, Control, FieldErrors } from 'react-hook-form'

import { CustomInput } from './CustomInput'
import { Text } from '../utils/theme/index'

type FormInputTypes = {
  control: Control
  errors: FieldErrors
  name: string
  inputText: string
  validationPattern: RegExp
  errorMessage: string
  required?: boolean
  forwardRef?: React.Ref<TextInput>
}

export const FormInput: FC<FormInputTypes & TextInputProps> = ({
  control,
  errors,
  name,
  inputText,
  validationPattern,
  errorMessage,
  required,
  forwardRef,
  ...props
}) => (
  <>
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <CustomInput
          inputText={inputText}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          isWrong={errors[name] !== undefined}
          forwardRef={forwardRef}
          {...props}
        />
      )}
      name={name}
      rules={{
        required,
        pattern: {
          value: validationPattern,
          message: errorMessage,
        },
      }}
      defaultValue=""
    />
    {errors[name] && (
      <Text variant="error1" marginTop="s" marginLeft="m">
        {errors[name].message ? errors[name].message : 'This field is required'}
      </Text>
    )}
  </>
)
