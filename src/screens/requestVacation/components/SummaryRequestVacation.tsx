import React, { useEffect } from 'react'
import { CustomButton } from 'components/CustomButton'
import { Box, mkUseStyles } from 'utils/theme/index'
import { useTranslation } from 'react-i18next'
import { useBooleanState } from 'hooks/useBooleanState'
import { RequestDetails } from 'components/RequestDetails/RequestDetails'

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
  const [isLoading, { setTrue: startLoading, setFalse: stopLoading }] = useBooleanState(false)
  const [isSuccess, { setTrue: markSuccess }] = useBooleanState(false)
  const { t } = useTranslation('requestVacation')
  const handleSend = () => {
    if (p.startDate && p.endDate) {
      startLoading()
    }
  }
  useEffect(() => {
    let timeout: number | undefined
    if (isLoading) {
      timeout = setTimeout(() => {
        stopLoading()
        markSuccess()
      }, 800)
    }

    return () => clearTimeout(timeout)
  }, [isLoading, markSuccess, stopLoading])

  useEffect(() => {
    if (isSuccess) {
      onNextPressed()
    }
  }, [isSuccess, onNextPressed])

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
          onPress={handleSend}
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
