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
  const { handleRequestHolidays, isLoading, isSuccess } = useRequestHolidays()

  const { t } = useTranslation('requestVacation')

  const handleSend = () => {
    if (startDate && endDate) {
      handleRequestHolidays({
        startDate: getISODateString(startDate),
        endDate: getISODateString(endDate),
        description,
        sickTime: isSick,
        message,
      })
    }
  }
  useEffect(() => {
    if (isSuccess) {
      onNextPressed()
    }
  }, [isSuccess, onNextPressed])
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
        maxWidth={250}
        alignSelf="center"
      />
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  button: {
    marginTop: 20,
  },
}))
