import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Box } from 'utils/theme'
import { minTwoWordsRegex, minOneSignRegex, passwordRegex } from 'utils/regex'
import { FormInput } from 'components/FormInput'

type UserData = {
  // firstName?: string
  // lastName?: string
  // role?: string
  // password?: string
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileDetails = ({ setIsEdited }: UserData) => {
  const { control, errors } = useForm()
  const { t } = useTranslation('userProfile')

  const onSubmitEditing = () => {
    setIsEdited(true)
    console.log('submit editing')

    // TODO submit editing input
  }

  return (
    <Box paddingHorizontal="m">
      <FormInput
        control={control}
        isError={!!errors.nameSurname}
        errors={errors}
        name="nameSurname"
        inputLabel={t('userNameSurname')}
        validationPattern={minTwoWordsRegex}
        errorMessage={t('editDetailsErrMsg')}
        keyboardType="default"
        autoCompleteType="off"
        onSubmitEditing={onSubmitEditing}
        isEditIconVisible
      />

      <FormInput
        control={control}
        isError={!!errors.role}
        errors={errors}
        name="role"
        inputLabel={t('userRole')}
        validationPattern={minOneSignRegex}
        errorMessage={t('editDetailsErrMsg')}
        keyboardType="default"
        autoCompleteType="off"
        onSubmitEditing={onSubmitEditing}
        isEditIconVisible
      />

      <FormInput
        control={control}
        isError={!!errors.password}
        errors={errors}
        name="password"
        inputLabel={t('userPassword')}
        validationPattern={passwordRegex}
        errorMessage={t('editDetailsErrMsg')}
        onSubmitEditing={onSubmitEditing}
        isEditIconVisible
      />
    </Box>
  )
}
