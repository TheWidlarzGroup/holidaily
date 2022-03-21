import React, { useEffect } from 'react'
import { CustomButton } from 'components/CustomButton'
import { Box, mkUseStyles } from 'utils/theme/index'
import { getISODateString, calculatePTO } from 'utils/dates'
import { ScrollView } from 'react-native-gesture-handler'
import { useRequestHolidays } from 'hooks/useRequestHolidays'
import { useTranslation } from 'react-i18next'
import { SummaryDays } from './SummaryRequestVacation/SummaryDays'
import { SummaryRequestVacationHeader } from './SummaryRequestVacation/SummaryRequestVacationHeader'
import { SicktimeAndMessage } from './SummaryRequestVacation/SicktimeAndMessage'
import { SummaryRequestVacationPhotos } from './SummaryRequestVacation/SummaryRequestVacationPhotos'
import { useBooleanState } from 'hooks/useBooleanState'

type SummaryRequestVacationProps = {
  description: string
  isSick: boolean
  onNextPressed: F0
  startDate?: Date
  endDate?: Date
  message?: string
  photos?: { id: string; uri: string }[]
}

export const SummaryRequestVacation = ({
  description,
  isSick,
  onNextPressed,
  endDate,
  startDate,
  message,
  photos = [],
}: SummaryRequestVacationProps) => {
  const styles = useStyles()
  const [isLoading, { setTrue: startLoading, setFalse: stopLoading }] = useBooleanState(false)
  const [isSuccess, { setTrue: markSuccess }] = useBooleanState(false)

  const { t } = useTranslation('requestVacation')

  const handleSend = () => {
    if (startDate && endDate) {
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
    if (isSuccess) {
      onNextPressed()
    }
    return () => clearTimeout(timeout)
  }, [isSuccess, onNextPressed, isLoading, markSuccess, stopLoading])
  const ptoTaken = startDate && endDate ? calculatePTO(startDate, endDate) : 0

  return (
    <Box flex={1} padding="l" paddingTop="xl">
      <ScrollView style={{ flex: 1 }}>
        <Box backgroundColor="primary" borderRadius="m" padding="m" paddingBottom="xxxxl">
          <SummaryRequestVacationHeader
            startDate={startDate}
            endDate={endDate}
            description={description}
          />
          <SicktimeAndMessage isSick={isSick} message={message} />
          <SummaryRequestVacationPhotos photos={photos} />
          <Box borderBottomColor="black" borderBottomWidth={2} marginVertical="m" />
          <SummaryDays ptoTaken={ptoTaken} />
        </Box>
      </ScrollView>
      <CustomButton
        label={t('sendRequest')}
        variant="primary"
        onPress={handleSend}
        style={styles.button}
        loading={isLoading}
      />
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  button: {
    marginTop: 20,
  },
}))
