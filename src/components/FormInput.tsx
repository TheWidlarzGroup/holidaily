import React, { FC } from 'react'
import { Controller } from 'react-hook-form'

import { CustomInput } from './CustomInput'
import { Text } from '../utils/theme/index'

type FormInputTypes = {
  control: any
  errors: any
  name: string
  inputText: string
  validationPattern: RegExp
  errorMessage: string
}

export const FormInput: FC<FormInputTypes> = ({
  control,
  errors,
  name,
  inputText,
  validationPattern,
  errorMessage,
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
