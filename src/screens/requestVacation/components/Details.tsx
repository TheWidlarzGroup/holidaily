import { FormInput } from 'components/FormInput'
import { InputButton } from 'components/InputButton'
import React from 'react'
import { Box, Text } from 'utils/theme'
import { ModalNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'
import { getFormattedPeriod } from 'utils/dates'

type DetailsProps = {
  date: {
    start?: Date
    end?: Date
  }
  control: any
}

export const Details = ({ date, control }: DetailsProps) => {
  const navigation = useNavigation<ModalNavigationType<'RequestVacation'>>()

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
          isError={false}
          errors={{}}
          name="description"
          inputLabel="Description (optional)"
          validationPattern={/$/}
          errorMessage="Incorrect description"
          keyboardType="default"
          autoCompleteType="off"
        />
      </Box>
    </Box>
  )
}
