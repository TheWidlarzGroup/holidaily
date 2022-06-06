import React from 'react'
import { Box, Text, useTheme } from 'utils/theme/index'
import { useTranslation } from 'react-i18next'
import { RequestDetails } from 'components/RequestDetails/RequestDetails'
import { useCreateDayOffRequest } from 'dataAccess/mutations/useCreateDayoffRequest'
import { Submit } from 'components/Submit'
import IconPill from 'assets/icons/icon-pill.svg'

type SummaryRequestVacationProps = {
  description: string
  isSick: boolean
  onNextPressed: F0
  startDate?: Date
  endDate?: Date
  createdAt?: Date
  message?: string
  attachments?: { id: string; uri: string }[]
  hideNext?: boolean
}

export const SummaryRequestVacation = ({ onNextPressed, ...p }: SummaryRequestVacationProps) => {
  const { t } = useTranslation('requestVacation')
  const { mutate, isLoading } = useCreateDayOffRequest()
  const onSubmit = () => {
    if (!p.startDate || !p.endDate || !p.createdAt) return

    mutate(
      {
        startDate: p.startDate.toISOString(),
        endDate: p.endDate.toISOString(),
        createdAt: p.createdAt.toISOString(),
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
      {p.isSick && <SickTimeInfo />}
      <RequestDetails
        source="ADD_REQUEST"
        description={p.description}
        message={p.message ?? ''}
        attachments={p.attachments}
        startDate={(p.startDate ?? new Date()).toISOString()}
        endDate={(p.endDate ?? new Date()).toISOString()}
        createdAt={(p.createdAt ?? new Date()).toISOString()}
        isSickTime={p.isSick}
        status={p.isSick ? 'accepted' : 'pending'}
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

const SickTimeInfo = () => {
  const { t } = useTranslation('requestVacation')
  const theme = useTheme()

  return (
    <Box
      bg="quarternaryOpaque"
      padding="m"
      marginVertical="s"
      borderRadius="l1min"
      flexDirection="row"
      alignItems="center">
      <IconPill color={theme.colors.quarternary} />
      <Text variant="textSM" marginLeft="s">
        {t('sickDayDescription')}
      </Text>
    </Box>
  )
}
