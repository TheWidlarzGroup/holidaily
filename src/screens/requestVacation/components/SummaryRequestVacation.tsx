import React from 'react'
import { Box } from 'utils/theme/index'
import { useTranslation } from 'react-i18next'
import { RequestDetails } from 'components/RequestDetails/RequestDetails'
import { useCreateDayOffRequest } from 'dataAccess/mutations/useCreateDayoffRequest'
import { Submit } from 'components/Submit'

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
        description: p.description,
        isSickTime: p.isSick,
        message: p.message ?? '',
        attachments: p.attachments,
      },
      { onSuccess: onNextPressed }
    )
  }

  return (
    <Box flex={1} padding="l" paddingTop="xl">
      <RequestDetails
        description={p.description}
        message={p.message ?? ''}
        attachments={p.attachments}
        startDate={(p.startDate ?? new Date()).toISOString()}
        endDate={(p.endDate ?? new Date()).toISOString()}
        isSickTime={p.isSick}
        status="pending"
      />
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
