import { CustomButton } from 'components/CustomButton'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getDurationInDays } from 'utils/dates'
import { Text } from 'utils/theme'

type NotEnoughPtoProps = {
  availablePto: number
  onPress: F0
  origin?: 'calendar' | 'form'
}

export const NotEnoughPTO = (p: NotEnoughPtoProps) => {
  const { t } = useTranslation('requestVacation')
  return (
    <>
      <Text fontSize={15} lineHeight={20} textAlign="center">
        {t('error')}
      </Text>
      <Text
        fontSize={14}
        fontFamily="Nunito-Bold"
        textAlign="center"
        marginTop="m"
        marginBottom="l">
        {t('availablePto', { availablePto: getDurationInDays(p.availablePto) })}
      </Text>
      <CustomButton
        label={p.origin === 'form' ? t('changeDays') : t('clear')}
        variant="danger"
        onPress={p.onPress}
      />
    </>
  )
}
