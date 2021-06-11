import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Text } from 'utils/theme/index'
import { FormInput } from 'components/FormInput'
import { CustomButton } from 'components/CustomButton'
import { requestDataTypes } from '../RequestVacation'
import { useBooleanState } from 'hooks/useBooleanState'
import { CalendarModal } from './CalendarModal'

type FormTypes = {
  date: undefined
  description: string
}

type FormRequestVacationProps = {
  nextStep: () => void
  changeRequestData: (callback: (currentData: requestDataTypes) => requestDataTypes) => void
}

export const FormRequestVacation: FC<FormRequestVacationProps> = ({
  nextStep,
  changeRequestData,
}) => {
  const { control, handleSubmit, errors } = useForm()
  const [calendarVisible, { setTrue, setFalse }] = useBooleanState(false)

  const handleLoginUser = (data: FormTypes) => {
    if (Object.keys(errors).length) return
    changeRequestData((oldData) => ({ ...oldData, description: data.description }))
    nextStep()
  }

  const onFormSubmit = handleSubmit((data: FormTypes) => handleLoginUser(data))

  return (
    <Box flex={1} justifyContent="space-between" paddingBottom="m">
      <Box>
        <Text variant="boldBlack18" textAlign="left">
          Details
        </Text>
        <CustomButton label={'calendar'} variant="secondary" onPress={setTrue} />
        <FormInput
          control={control}
          isError={!!errors.description}
          errors={errors}
          name="description"
          inputLabel="Description (optional)"
          validationPattern={/.*/}
          errorMessage="Incorrect description"
          keyboardType="default"
          autoCompleteType="off"
        />

        <Text variant="boldBlack18" textAlign="left">
          Additionals
        </Text>
        <Text variant="body1" textAlign="left">
          {' '}
          Add and attachment or write a message{' '}
        </Text>
      </Box>
      <CustomButton label={'next'} variant="primary" onPress={onFormSubmit} />
      <CalendarModal isVisible={calendarVisible} hideModal={setFalse} />
    </Box>
  )
}
