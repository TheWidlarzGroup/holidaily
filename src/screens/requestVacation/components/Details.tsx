import { FormInput } from 'components/FormInput'
import { InputButton } from 'components/InputButton'
import React from 'react'
import { Box, Text } from 'utils/theme'
import { ModalNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'
import { getFormattedPeriod } from 'utils/dates'
import { useForm } from 'react-hook-form'

type DetailsProps = {
  date: {
    start?: Date
    end?: Date
  }
  onDescriptionChange: F1<string>
}

export const Details = ({ date, onDescriptionChange }: DetailsProps) => {
  const navigation = useNavigation<ModalNavigationType<'RequestVacation'>>()
  const { control, register, errors } = useForm()

  return (
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
          isError={!errors}
          errors={errors}
          name="description"
          inputLabel="Description (optional)"
          validationPattern={/$/}
          errorMessage="Incorrect description"
          keyboardType="default"
          autoCompleteType="off"
          onChange={(e) => onDescriptionChange(e.nativeEvent.text)}
          {...register('description', { required: false })}
          maxLength={300}
        />
      </Box>
    </Box>
  )
}
