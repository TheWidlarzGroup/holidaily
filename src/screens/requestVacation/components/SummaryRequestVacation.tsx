import React, { useRef } from 'react'
import { Box, Text } from 'utils/theme/index'
import { Trans, useTranslation } from 'react-i18next'
import { RequestDetails } from 'components/RequestDetails/RequestDetails'
import { useCreateDayOffRequest } from 'dataAccess/mutations/useCreateDayoffRequest'
import { Submit } from 'components/Submit'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { calculatePTO, getDurationInDays } from 'utils/dates'

type SummaryRequestVacationProps = {
  description: string
  isSick: boolean
  onNextPressed: F0
  startDate?: Date
  endDate?: Date
  message?: string
  attachments?: { id: string; uri: string }[]
  hideNext?: boolean
}

export const SummaryRequestVacation = ({ onNextPressed, ...p }: SummaryRequestVacationProps) => {
  const { t } = useTranslation('requestVacation')

  const { mutate, isLoading } = useCreateDayOffRequest()
  const onSubmit = () => {
    if (!p.startDate || !p.endDate) return

    mutate(
      {
        startDate: p.startDate.toISOString(),
        endDate: p.endDate.toISOString(),
        description: p.description ?? t('outOfOffice'),
        isSickTime: p.isSick,
        message: p.message ?? '',
        attachments: p.attachments,
      },
      { onSuccess: onNextPressed }
    )
  }

  return (
    <Box flex={1} paddingHorizontal="m">
      <RequestDetails
        description={p.description}
        message={p.message ?? ''}
        attachments={p.attachments}
        startDate={(p.startDate ?? new Date()).toISOString()}
        endDate={(p.endDate ?? new Date()).toISOString()}
        isSickTime={p.isSick}
        status="pending"
      />
      {!!p.startDate && !!p.endDate && <PtoLeft ptoTaken={calculatePTO(p.startDate, p.endDate)} />}
      {!p.hideNext && (
        <Submit
          loading={isLoading}
          onCTAPress={onSubmit}
          disabledCTA={false}
          noBg
          text={t('sendRequest')}
        />
      )}
    </Box>
  )
}

const PtoLeft = (p: { ptoTaken: number }) => {
  const { user } = useUserContext()
  // Comment: ref, because once assigned, we don't want this number to change when we reduce availablePto by submitting request
  const availablePto = useRef((user?.availablePto ?? 0) - p.ptoTaken)
  return (
    <Box padding="m" bg="attachmentBg" borderRadius="l1min" marginTop="l">
      <Text variant="textSM">
        <Trans
          ns="requestVacation"
          i18nKey="ptoLeft"
          components={{ b: <Text variant="textBoldSM" /> }}
          values={{ days: getDurationInDays(availablePto.current) }}
        />
      </Text>
    </Box>
  )
}
