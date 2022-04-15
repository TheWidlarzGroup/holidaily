import { FormInput } from 'components/FormInput'
import { InputButton } from 'components/InputButton'
import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { ModalNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'
import { getFormattedPeriod } from 'utils/dates'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'

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
  const { sickTime } = useRequestVacationContext()
  const styles = useStyles()
  const { t } = useTranslation('requestVacation')

  return (
    <Box>
      <Text variant="boldBlack18" textAlign="left">
        {t('detailsTitle')}
      </Text>
      <Box marginTop="m">
        <InputButton
          inputLabel={t('detailsDate')}
          onClick={() => navigation.navigate('RequestVacationCalendar', { isSickTime: sickTime })}
          value={getFormattedPeriod(date.start, date.end)}
        />
      </Box>
      <Box marginTop="m">
        <FormInput
          control={control}
          isError={!errors}
          errors={errors}
          name="description"
          inputLabel={t('detailsDescription')}
          validationPattern={/$/}
          errorMessage={t('detailsDescriptionError')}
          keyboardType="default"
          autoCompleteType="off"
          onChange={(e) => onDescriptionChange(e.nativeEvent.text)}
          {...register('description', { required: false })}
          maxLengt={300}
          style={styles.formInput}
        />
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  formInput: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
}))
