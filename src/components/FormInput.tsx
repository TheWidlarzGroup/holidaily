import React, { forwardRef, useEffect } from 'react'
import { TextInputProps, TextInput } from 'react-native'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { BaseOpacity, Box, Text, useTheme } from 'utils/theme/index'
import IconEdit from 'assets/icons/icon-edit.svg'
import { generateInputErrors } from 'utils/generateInputErrors'
import { useTranslation } from 'react-i18next'
import { SearchIcon } from 'assets/icons/SearchIcon'
import { CustomInput } from './CustomInput'

type FormInputTypes = {
  control: Control
  errors: FieldErrors
  name: string
  inputLabel: string
  validationPattern: RegExp
  errorMessage: string
  isError: boolean
  variant: 'medium' | 'small' | 'mediumSpecial'
  signupPasswordHint?: string
  isPasswordIconVisible?: boolean
  passwordsAreEqual?: boolean
  screenName?: string
  disabled?: boolean
  placeholder?: string
  reset?: F0
  onBaseOpacityPress?: F0
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
      onBaseOpacityPress,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation('inputErrors')
    const errorOpacity = useSharedValue(0)
    const theme = useTheme()
    const progressStyle = useAnimatedStyle(() => ({
      opacity: withTiming(errorOpacity.value, {
        duration: 300,
      }),
    }))

    useEffect(() => {
      errorOpacity.value = isError ? 1 : 0
    }, [errorOpacity, isError])

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
        {props.variant === 'mediumSpecial' && (
          <Box
            position="absolute"
            right={0}
            top={16}
            backgroundColor="lightGrey"
            borderRadius="full"
            width={49}
            height={49}
            borderWidth={4}
            borderColor="white"
            justifyContent="center"
            alignItems="center">
            <BaseOpacity onPress={onBaseOpacityPress} activeOpacity={0.2}>
              <IconEdit color={theme.colors.headerGrey} />
            </BaseOpacity>
          </Box>
        )}
        {props.variant === 'small' && (
          <Box position="absolute" left={6} top={25}>
            <SearchIcon fill="grey" />
          </Box>
        )}
        <Animated.View style={progressStyle}>
          <Text variant="inputErrorMessage" marginTop="xs" marginLeft="s">
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
