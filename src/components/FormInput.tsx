import React, { forwardRef, useEffect } from 'react'
import { TextInputProps, TextInput } from 'react-native'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { Text } from 'utils/theme/index'
import { generateInputErrors } from 'utils/generateInputErrors'
import { useTranslation } from 'react-i18next'
import { CustomInput } from './CustomInput'

type FormInputTypes = {
  control: Control
  errors: FieldErrors
  name: string
  inputLabel: string
  validationPattern: RegExp
  errorMessage: string
  signupPasswordHint?: string
  isPasswordIconVisible?: boolean
  passwordsAreEqual?: boolean
  screenName?: string
  isError: boolean
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
      signupPasswordHint,
      isPasswordIconVisible,
      passwordsAreEqual,
      screenName,
      isError,
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
      errorOpacity.value = isError ? 1 : 0
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError])

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
              isError={isError}
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
          <Text variant="inputErrorMessage" marginTop="xs" marginLeft="m">
            {generateInputErrors({ errors, name, passwordsAreEqual, screenName, t })}
          </Text>
        </Animated.View>

        {signupPasswordHint && (
          <Text variant="lightGreyRegular" marginTop="xs" marginLeft="m" textAlign="center">
            {signupPasswordHint}
          </Text>
        )}
      </>
    )
  }
)

FormInput.displayName = 'FormInput'
