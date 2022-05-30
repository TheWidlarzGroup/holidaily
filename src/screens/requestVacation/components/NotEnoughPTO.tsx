import { CustomButton } from 'components/CustomButton'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { getDurationInDays } from 'utils/dates'
import { Box, Text } from 'utils/theme'
import ExlamationMark from 'assets/icons/icon-exclamation-mark.svg'

type NotEnoughPtoProps = {
  availablePto: number
  onPress: F0
  origin?: 'calendar' | 'form'
  customError?: ReactElement | null
}

export const NotEnoughPTO = (p: NotEnoughPtoProps) => {
  const { t } = useTranslation('requestVacation')
  return (
    <>
      <Box flex={1} flexDirection="row" alignItems="flex-start">
        <Box
          marginRight="m"
          bg="errorRed"
          height={28}
          width={28}
          marginTop="none"
          borderRadius="full"
          alignItems="center"
          justifyContent="center">
          <ExlamationMark color="white" />
        </Box>
        <Box flex={1}>
          {p.customError ? (
            p.customError
          ) : (
            <>
              <Text fontSize={15} lineHeight={20}>
                {t('notEnoughPto')}
              </Text>
              <Text fontSize={14} fontFamily="Nunito-Bold" marginTop="m" marginBottom="l">
                {t('availablePto', { availablePto: getDurationInDays(p.availablePto) })}
              </Text>
            </>
          )}
        </Box>
      </Box>
      <CustomButton
        label={p.origin === 'form' ? t('changeDays') : t('clear')}
        variant="danger"
        onPress={p.onPress}
      />
    </>
  )
}
