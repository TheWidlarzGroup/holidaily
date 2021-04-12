import React, { forwardRef } from 'react'
import { TextInputProps, TextInput } from 'react-native'
import { Controller, Control, FieldErrors } from 'react-hook-form'

import { CustomInput } from './CustomInput'
import { Text } from '../utils/theme/index'

type FormInputTypes = {
  control: Control
  errors: FieldErrors
  name: string
  inputLabel: string
  validationPattern: RegExp
  errorMessage: string
  required?: boolean
  signupPasswordHint?: string
}

export const FormInput = forwardRef<TextInput, FormInputTypes & TextInputProps>(
  (
    {
      control,
      errors,
      name,
      inputLabel,
      validationPattern,
      errorMessage,
      required,
      signupPasswordHint,
      ...props
    },
    ref
  ) => (
    <>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            inputLabel={inputLabel}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            isError={!!errors[name]}
            ref={ref}
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
        <Text variant="inputErrorMessage" marginTop="s" marginLeft="m">
          {errors[name].message || 'This field is required'}
        </Text>
      )}
      {signupPasswordHint && (
        <Text variant="lightGreyRegular" marginTop="s" marginLeft="m" textAlign="center">
          {signupPasswordHint}
        </Text>
      )}
    </>
  )
)

FormInput.displayName = 'FormInput'
