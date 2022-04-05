import React from 'react'
import { CustomButton } from 'components/CustomButton'
import { Box, mkUseStyles } from 'utils/theme/index'
import { useTranslation } from 'react-i18next'
import { RequestDetails } from 'components/RequestDetails/RequestDetails'
import { useCreateDayOffRequest } from 'dataAccess/mutations/useCreateDayoffRequest'

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
  const styles = useStyles()
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
        status={'pending'}
      />
      {!p.hideNext && (
        <CustomButton
          label={t('sendRequest')}
          variant="primary"
          onPress={onSubmit}
          style={styles.button}
          loading={isLoading}
          maxWidth={250}
          alignSelf="center"
        />
      )}
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  button: {
    marginTop: 20,
  },
}))
