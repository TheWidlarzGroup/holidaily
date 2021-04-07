import React, { FC } from 'react'
import { TextInputProps } from 'react-native'
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
}

export const FormInput: FC<FormInputTypes & TextInputProps> = ({
  control,
  errors,
  name,
  inputText,
  validationPattern,
  errorMessage,
  ...props
}) => (
  <>
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <CustomInput
          inputText={inputText}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          isWrong={errors[name] !== undefined}
          {...props}
        />
      )}
      name={name}
      rules={{
        pattern: {
          value: validationPattern,
          message: errorMessage,
        },
      }}
      defaultValue=""
    />
    {errors[name] && (
      <Text variant="error1" marginTop="s" marginLeft="m">
        {errors[name].message}
      </Text>
    )}
  </>
)
