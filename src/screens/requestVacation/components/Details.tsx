import { FormInput } from 'components/FormInput'
import React from 'react'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import { ModalNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'
import { getFormattedPeriod } from 'utils/dates'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CustomInput } from 'components/CustomInput'
import CalendarIcon from 'assets/icons/icon-calendar.svg'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'

type DetailsProps = {
  date: {
    start?: Date
    end?: Date
  }
  onDescriptionChange: F1<string>
  hideNext: F0
  showNext: F0
}

export const Details = ({ date, onDescriptionChange, hideNext, showNext }: DetailsProps) => {
  const navigation = useNavigation<ModalNavigationType<'REQUEST_VACATION'>>()
  const { control, register, errors } = useForm()
  const { sickTime, isPeriodInvalid } = useRequestVacationContext()
  const { t } = useTranslation('requestVacation')
  const theme = useTheme()
  return (
    <Box>
      <Text variant="boldBlack18" textAlign="left">
        {t('detailsTitle')}
      </Text>
      <Box marginTop="m">
        <BaseOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('REQUEST_VACATION_CALENDAR', { isSickTime: sickTime })
          }>
          <CustomInput
            focusable={false}
            disabled
            placeholder={t('selectDate')}
            inputLabel={t('detailsDate')}
            isError={isPeriodInvalid}
            variant="medium"
            value={getFormattedPeriod(date.start, date.end)}
          />
          <Box position="absolute" right={theme.spacing.m} top={theme.spacing.lplus}>
            <CalendarIcon color={theme.colors.headerGrey} />
          </Box>
        </BaseOpacity>
      </Box>
      <Box marginTop="m">
        <FormInput
          variant="medium"
          control={control}
          isError={!errors}
          errors={errors}
          name="description"
          inputLabel={t('detailsDescription')}
          placeholder={t('setDescription')}
          validationPattern={/$/}
          errorMessage={t('detailsDescriptionError')}
          keyboardType="default"
          onTouchStart={hideNext}
          onBlur={showNext}
          autoCompleteType="off"
          onChange={(e) => onDescriptionChange(e.nativeEvent.text)}
          {...register('description', { required: false })}
          maxLength={300}
        />
      </Box>
    </Box>
  )
}
