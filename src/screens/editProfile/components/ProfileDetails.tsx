import React, { useRef } from 'react'
import { TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import { FormInput } from 'components/FormInput'
import { Box } from 'utils/theme/'
import { onlyLettersRegex } from 'utils/regex'
import { Control, DeepMap, FieldError, FieldValues } from 'react-hook-form'

type UserData = {
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
  errors: DeepMap<{ firstName: string; lastName: string; occupation: string }, FieldError>
  control: Control<FieldValues>
  doesValueChanged?: boolean
}
const validationPattern = onlyLettersRegex
export const ProfileDetails = ({ errors, control, setIsEdited, doesValueChanged }: UserData) => {
  const { t } = useTranslation('userProfile')
  const inputsRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ]
  const errorMessage = t('fieldRequired')
  const onSubmitEditing = () => {
    setIsEdited(true)
  }
  const onFocusInput = (index: number) => {
    if (index === 3) {
      return
    }
    inputsRefs[index]?.current?.focus()
  }
  // const navigation = useNavigation()
  // const navigateToChangePassword = () => navigation.navigate('ChangePassword')
  const commonInputProps = {
    maxLength: 15,
    control,
    onBlur: onSubmitEditing,
    errors,
    validationPattern,
    errorMessage,
    doesValueChanged,
  } as const
  return (
    <Box paddingHorizontal="m">
      <Box position="relative">
        <FormInput
          {...commonInputProps}
          variant="mediumSpecial"
          isError={!!errors.firstName}
          name="firstName"
          inputLabel={t('userFirstName')}
          placeholder={t('userFirstName')}
          ref={inputsRefs[0]}
          onBaseOpacityPress={() => onFocusInput(0)}
        />
      </Box>
      <Box position="relative">
        <FormInput
          {...commonInputProps}
          variant="mediumSpecial"
          isError={!!errors.lastName}
          name="lastName"
          inputLabel={t('userLastName')}
          placeholder={t('userLastName')}
          ref={inputsRefs[1]}
          onBaseOpacityPress={() => onFocusInput(1)}
        />
      </Box>
      <Box position="relative">
        <FormInput
          {...commonInputProps}
          maxLength={20}
          variant="mediumSpecial"
          isError={!!errors.occupation}
          name="occupation"
          inputLabel={t('userOccupation')}
          placeholder={t('userOccupation')}
          ref={inputsRefs[2]}
          onBaseOpacityPress={() => onFocusInput(2)}
        />
      </Box>
      {/* <Box marginBottom="l">
        <InputButton
          inputLabel={t('userPassword')}
          value={'••••••••'}
          onClick={navigateToChangePassword}
          showEditIcon
          labelTextVariant="labelGrey"
        />
      </Box> */}
    </Box>
  )
}
