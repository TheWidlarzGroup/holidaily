import React, { forwardRef, useEffect } from 'react'
import { TextInputProps, TextInput } from 'react-native'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { Text } from 'utils/theme/index'
import { CustomInput } from './CustomInput'
import { generateInputErrors } from 'utils/generateInputErrors'
import { useTranslation } from 'react-i18next'

type FormInputTypes = {
  control: Control
  errors: FieldErrors
  name: string
  inputLabel: string
  validationPattern: RegExp
  errorMessage: string
  required?: boolean
  signupPasswordHint?: string
  isPasswordIconVisible?: boolean
  passwordsAreEqual?: boolean
  screenName?: string
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
      isPasswordIconVisible,
      passwordsAreEqual,
      screenName,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation('inputErrors')
    const errorOpacity = useSharedValue(0)

    const progressStyle = useAnimatedStyle(() => ({
      opacity: withTiming(errorOpacity.value, {
        duration: 300,
      }),
    }))

    useEffect(() => {
      if (errors[name] || (!passwordsAreEqual && screenName === 'NewPassword')) {
        errorOpacity.value = 1
      } else {
        errorOpacity.value = 0
      }
    }, [errors[name], passwordsAreEqual])

    return (
      <>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <CustomInput
              inputLabel={inputLabel}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              isError={!!errors[name] || (!passwordsAreEqual && screenName === 'NewPassword')}
              ref={ref}
              isPasswordIconVisible={isPasswordIconVisible}
              {...props}
            />
          )}
          name={name}
          rules={{
            required: `${t('requiredField')}`,
            pattern: {
              value: validationPattern,
              message: errorMessage,
            },
          }}
          defaultValue=""
        />

        <Animated.View style={progressStyle}>
          <Text variant="inputErrorMessage" marginTop="s" marginLeft="m">
            {generateInputErrors({ errors, name, passwordsAreEqual, screenName })}
          </Text>
        </Animated.View>

        {signupPasswordHint && (
          <Text variant="lightGreyRegular" marginTop="s" marginLeft="m" textAlign="center">
            {signupPasswordHint}
          </Text>
        )}
      </>
    )
  }
)

FormInput.displayName = 'FormInput'
