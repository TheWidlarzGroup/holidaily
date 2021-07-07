import React from 'react'

import { CustomButton } from 'components/CustomButton'
import { Box, mkUseStyles, Text } from 'utils/theme/index'
import { getFormattedPeriod } from 'utils/dates'
import CalendarIcon from 'assets/icons/calendar.svg'
import PillIcon from 'assets/icons/pill.svg'
import BackgroundPlant1 from 'assets/backgroundPlant1.svg'
import BackgroundPlant2 from 'assets/backgroundPlant2.svg'
import { SummaryDays } from './SummaryDays'
import { Photo } from './Photo'
import { ScrollView } from 'react-native-gesture-handler'

type SummaryRequestVacationProps = {
  description: string
  sickTime: boolean
  onNextPressed: F0
  startDate?: Date
  endDate?: Date
  message?: string
  photos?: string[]
}

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

  return (
    <ScrollView style={{ height: 300 }}>
      <Box
        flexDirection="column"
        justifyContent="space-between"
        flex={1}
        padding="l"
        paddingTop="xl">
        <Box backgroundColor="primary" borderRadius="m" padding="m" paddingBottom="xxxxl">
          <BackgroundPlant1 style={styles.plant1} />
          <BackgroundPlant2 style={styles.plant2} height={90} />
          <Box paddingLeft="s">
            <Text variant="heading4">{description || 'Time off'}</Text>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <CalendarIcon />
            <Text variant="body1Bold">{getFormattedPeriod(startDate, endDate)}</Text>
          </Box>
          {sickTime && (
            <Box flexDirection="row" alignItems="center">
              <PillIcon />
              <Text variant="body1">Sick time off</Text>
            </Box>
          )}
          {!!message && (
            <Text variant="regular15" paddingTop="m">
              {message}
            </Text>
          )}
          {!!photos.length && (
            <Box flexDirection="row" flexWrap="wrap">
              {photos.map((uri) => (
                <Box marginRight="s" marginTop="s">
                  <Photo src={uri} size={90} marginBottom="m" />
                </Box>
              ))}
            </Box>
          )}
          <Box borderBottomColor="black" borderBottomWidth={2} marginVertical="m" />
          <SummaryDays />
        </Box>

        <CustomButton
          label={'Send request'}
          variant="primary"
          onPress={onNextPressed}
          marginTop={20}
        />
      </Box>
    </ScrollView>
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
}))
