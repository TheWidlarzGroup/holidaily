import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Text } from 'utils/theme/index'
import { FormInput } from 'components/FormInput'
import { InputButton } from 'components/InputButton'
import { CustomButton } from 'components/CustomButton'
import { Checkbox } from 'components/Checkbox'
import { useBooleanState } from 'hooks/useBooleanState'
import { Additionals } from './Additionals'
import { useNavigation } from '@react-navigation/core'
import { ModalNavigationType } from 'navigation/types'
import { getFormattedPeriod, getMonthName } from 'utils/dates'

type FormTypes = {
  date: undefined
  description: string
}

type RequestDataTypes = {
  description: string
  sickTime: boolean
}

type FormRequestVacationProps = {
  date: {
    start?: Date
    end?: Date
  }
  nextStep: () => void
  changeRequestData: (callback: (currentData: RequestDataTypes) => RequestDataTypes) => void
}

export const FormRequestVacation: FC<FormRequestVacationProps> = ({
  date,
  nextStep,
  changeRequestData,
}) => {
  const { control, handleSubmit, errors } = useForm()
  const [calendarVisible, { setTrue: setDisplayCalendarTrue, setFalse: setDisplayCalendarFalse }] =
    useBooleanState(false)

  const [sickTime, { toggle }] = useBooleanState(false)

  const handleLoginUser = (data: FormTypes) => {
    if (Object.keys(errors).length) return
    changeRequestData((oldData) => ({ ...oldData, description: data.description, sickTime }))
    nextStep()
  }

  const navigation = useNavigation<ModalNavigationType<'RequestVacation'>>()

  const onFormSubmit = handleSubmit((data: FormTypes) => handleLoginUser(data))

  return (
    <Box flex={1} justifyContent="space-between" paddingBottom="m">
      <Box>
        <Box>
          <Text variant="boldBlack18" textAlign="left">
            Details
          </Text>
          <Box marginTop="m">
            <InputButton
              inputLabel="Date"
              onClick={() => navigation.navigate('RequestVacationCalendar')}
              value={getFormattedPeriod(date.start, date.end)}
            />
          </Box>
          <Box marginTop="m">
            <FormInput
              control={control}
              isError={!!errors.description}
              errors={errors}
              name="description"
              inputLabel="Description (optional)"
              validationPattern={/$/}
              errorMessage="Incorrect description"
              keyboardType="default"
              autoCompleteType="off"
            />
          </Box>
        </Box>
        <Box marginTop="s">
          <Text variant="boldBlack18" textAlign="left">
            Sick time off
          </Text>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text variant="body1" textAlign="left">
              I'm not feeling well
            </Text>
            <Checkbox checked={sickTime} onPress={toggle} />
          </Box>
        </Box>
        <Additionals />
      </Box>
      <CustomButton label={'next'} variant="primary" onPress={onFormSubmit} />
    </Box>
  )
}
