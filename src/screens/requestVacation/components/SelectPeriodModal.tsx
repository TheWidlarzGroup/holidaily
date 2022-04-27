import React, { ReactElement } from 'react'
import { ModalProps } from 'react-native-modal'
import { Text } from 'utils/theme'
import { CustomButton } from 'components/CustomButton'
import { getDurationInDays, getFormattedPeriod } from 'utils/dates'
import { useTranslation } from 'react-i18next'
import { BottomModal } from 'components/BottomModal'
import { NotEnoughPTO } from './NotEnoughPTO'

type SelectPeriodModalProps = Pick<ModalProps, 'isVisible'> & {
  onSubmit: F0
  onClear: F0
  periodStart: string
  periodEnd: string
  ptoTaken: number
  isInvalid: boolean
  availablePto: number
  customError?: ReactElement | null
}

export const SelectPeriodModal = (p: SelectPeriodModalProps) => {
  const { t } = useTranslation('requestVacation')

  return (
    <BottomModal isVisible={p.isVisible} isInvalid={p.isInvalid}>
      {p.isInvalid ? (
        <NotEnoughPTO
          onPress={p.onClear}
          availablePto={p.availablePto}
          customError={p.customError}
        />
      ) : (
        <>
          <Text variant="boldBlackCenter18">
            {!!p.periodStart &&
              !!p.periodEnd &&
              getFormattedPeriod(new Date(p.periodStart), new Date(p.periodEnd))}
          </Text>
          <Text variant="body1" marginTop="xs" marginBottom="l">
            {t('pickedPTO', { days: getDurationInDays(p.ptoTaken) })}
          </Text>
          <CustomButton label={t('select')} variant="primary" onPress={p.onSubmit} />
        </>
      )}
    </BottomModal>
  )
}
