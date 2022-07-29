import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormInput } from 'components/FormInput'
import { Box } from 'utils/theme/'
import { onlyLettersRegex } from 'utils/regex'
import { Control, DeepMap, FieldError, FieldValues } from 'react-hook-form'

type UserData = {
  errors: DeepMap<{ firstName: string; lastName: string; occupation: string }, FieldError>
  control: Control<FieldValues>
  hasValueChanged?: boolean
  reset?: F0
}
const validationPattern = onlyLettersRegex
export const ProfileDetails = ({ errors, control, hasValueChanged }: UserData) => {
  const { t } = useTranslation('userProfile')
  const errorMessage = t('fieldRequired')

  const commonInputProps = {
    maxLength: 20,
    control,
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
          isRequired={false}
        />
      </Box>
      <Box position="relative">
        <FormInput
          {...commonInputProps}
          variant="mediumSpecial"
          isError={!!errors.occupation}
          name="occupation"
          inputLabel={t('userRole')}
          placeholder={t('rolePlaceholder')}
          isRequired={false}
        />
      </Box>
    </Box>
  )
}
