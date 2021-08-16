import React, { useEffect } from 'react'
import { CustomButton } from 'components/CustomButton'
import { Box, mkUseStyles, Text } from 'utils/theme/index'
import { getFormattedPeriod, getISODateString } from 'utils/dates'
import CalendarIcon from 'assets/icons/calendar.svg'
import PillIcon from 'assets/icons/pill.svg'
import BackgroundPlant1 from 'assets/backgroundPlant1.svg'
import BackgroundPlant2 from 'assets/backgroundPlant2.svg'
import { ScrollView } from 'react-native-gesture-handler'
import { useRequestHolidays } from 'hooks/useRequestHolidays'
import { useTranslation } from 'react-i18next'
import { SummaryDays } from './SummaryDays'
import { Photo } from './Photo'

type SummaryRequestVacationProps = {
  description: string
  sickTime: boolean
  onNextPressed: F0
  startDate?: Date
  endDate?: Date
  message?: string
  photos?: { id: string; uri: string }[]
}

type Side = 'left' | 'right'

export const SummaryRequestVacation = ({
  description,
  sickTime,
  onNextPressed,
  endDate,
  startDate,
  message,
  photos = [],
}: SummaryRequestVacationProps) => {
  const styles = useStyles()
  const { handleRequestHolidays, isLoading, isSuccess } = useRequestHolidays()

  const { t } = useTranslation('requestVacation')

  const getPadding = (index: number, side: Side) => {
    const n = index % 3
    const paddingSize = 2
    if (n === 0) return side === 'left' ? 0 : 2 * paddingSize
    if (n === 1) return paddingSize
    if (n === 2) return side === 'left' ? 2 * paddingSize : 0
  }

  const handleSend = () => {
    if (startDate && endDate) {
      handleRequestHolidays({
        startDate: getISODateString(startDate),
        endDate: getISODateString(endDate),
        description,
        sickTime,
        message,
      })
    }
  }
  useEffect(() => {
    if (isSuccess) {
      onNextPressed()
    }
  }, [isSuccess, onNextPressed])

  return (
    <Box flex={1} padding="l" paddingTop="xl">
      <ScrollView style={{ flex: 1 }}>
        <Box backgroundColor="primary" borderRadius="m" padding="m" paddingBottom="xxxxl">
          <BackgroundPlant1 style={styles.plant1} />
          <BackgroundPlant2 style={styles.plant2} height={90} />
          <Box paddingLeft="s">
            <Text variant="heading4">{description || t('timeOffDescriptionPlaceholder')}</Text>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <CalendarIcon />
            <Text variant="body1Bold">{getFormattedPeriod(startDate, endDate)}</Text>
          </Box>
          {sickTime && (
            <Box flexDirection="row" alignItems="center">
              <PillIcon />
              <Text variant="body1">{t('sickTimeTitle')}</Text>
            </Box>
          )}
          {!!message && (
            <Text variant="regular15" paddingTop="m">
              {message}
            </Text>
          )}
          {!!photos.length && (
            <Box flexDirection="row" flexWrap="wrap">
              {photos.map(({ uri, id }, uriIndex) => (
                <Box
                  key={id}
                  paddingTop="s"
                  style={{
                    paddingLeft: getPadding(uriIndex, 'left'),
                    paddingRight: getPadding(uriIndex, 'right'),
                    width: '33.33%',
                  }}>
                  <Photo src={uri} onClose={() => {}} />
                </Box>
              ))}
            </Box>
          )}
          <Box borderBottomColor="black" borderBottomWidth={2} marginVertical="m" />
          <SummaryDays />
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
  plant1: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  plant2: {
    position: 'absolute',
    bottom: 0,
    left: -30,
  },
  button: {
    marginTop: 20,
  },
}))
