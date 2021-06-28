import React from 'react'

import { CustomButton } from 'components/CustomButton'
import { Box, mkUseStyles, Text } from 'utils/theme/index'
import { getFormattedPeriod } from 'utils/dates'
import CalendarIcon from 'assets/icons/calendar.svg'
import PillIcon from 'assets/icons/pill.svg'
import BackgroundPlant1 from 'assets/backgroundPlant1.svg'
import BackgroundPlant2 from 'assets/backgroundPlant2.svg'
import { SummaryDays } from './SummaryDays'

type SummaryRequestVacationProps = {
  description: string
  sickTime: boolean
  startDate?: Date
  endDate?: Date
}

export const SummaryRequestVacation = ({
  description,
  sickTime,
  endDate,
  startDate,
}: SummaryRequestVacationProps) => {
  const styles = useStyles()

  return (
    <Box flexDirection="column" justifyContent="space-between" flex={1} padding="l" paddingTop="xl">
      <Box backgroundColor="primary" borderRadius="m" padding="m" flex={0.7}>
        <BackgroundPlant1 style={styles.plant1} />
        <BackgroundPlant2 style={styles.plant2} />
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
        <Box borderBottomColor="black" borderBottomWidth={2} marginVertical="m" />
        <SummaryDays />
      </Box>

      <CustomButton label={'next'} variant="primary" onPress={() => {}} />
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
    left: 0,
  },
}))
