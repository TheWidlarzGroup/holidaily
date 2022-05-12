import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormInput } from 'components/FormInput'
import { Box } from 'utils/theme/'
import { onlyLettersRegex } from 'utils/regex'
import { Control, DeepMap, FieldError, FieldValues } from 'react-hook-form'

type UserData = {
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
  errors: DeepMap<{ firstName: string; lastName: string; occupation: string }, FieldError>
  control: Control<FieldValues>
  hasValueChanged?: boolean
  reset?: F0
}
const validationPattern = onlyLettersRegex
export const ProfileDetails = ({ errors, control, setIsEdited, hasValueChanged }: UserData) => {
  const { t } = useTranslation('userProfile')
  const errorMessage = t('fieldRequired')
  const onSubmitEditing = () => {
    setIsEdited(true)
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
    hasValueChanged,
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
          placeholder={t('firstNamePlaceholder')}
        />
      </Box>
      <Box position="relative">
        <FormInput
          {...commonInputProps}
          variant="mediumSpecial"
          isError={!!errors.lastName}
          name="lastName"
          inputLabel={t('userLastName')}
          placeholder={t('lastNamePlaceholder')}
        />
      </Box>
      <Box position="relative">
        <FormInput
          {...commonInputProps}
          maxLength={20}
          variant="mediumSpecial"
          isError={!!errors.occupation}
          name="occupation"
          inputLabel={t('userRole')}
          placeholder={t('rolePlaceholder')}
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
