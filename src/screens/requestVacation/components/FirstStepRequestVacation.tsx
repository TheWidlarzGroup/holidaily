import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme/index'
import { TextLink } from 'components/TextLink'
import { useRetriggerAccountConfirmationEmail } from 'hooks/useRetriggerAccountConfirmationEmail'
import { ActivityIndicator } from 'react-native'
import { colors } from 'utils/theme/colors'
import { createAlert } from 'utils/createAlert'
import { useForm } from 'react-hook-form'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'

type FirstStepRequestVacationProps = {
  onClickNext: () => void
}

export const FirstStepRequestVacation: FC<FirstStepRequestVacationProps> = ({ onClickNext }) => {
  const { control, handleSubmit, errors } = useForm()

  const onSubmitEditing = () => {}

  return (
    <Box>
      <Text variant="title1">Step 1</Text>
      <FormInput
        control={control}
        isError={!!errors.description}
        errors={errors}
        name="email"
        inputLabel="Description (optional)"
        validationPattern={/^/}
        errorMessage="Incorrect description"
        keyboardType="default"
        autoCompleteType="off"
        onSubmitEditing={onSubmitEditing}
      />
      <CustomButton label={'next'} variant="primary" onPress={onClickNext} />
    </Box>
  )
}
