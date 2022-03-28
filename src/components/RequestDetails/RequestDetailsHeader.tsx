import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme/index'
import { getFormattedPeriod } from 'utils/dates'
import CalendarIcon from 'assets/icons/calendar.svg'
import BackgroundPlant1 from 'assets/backgroundPlant1.svg'
import BackgroundPlant2 from 'assets/backgroundPlant2.svg'
import { useTranslation } from 'react-i18next'

type RequestDetailsHeaderProps = {
  description?: string
  startDate?: Date
  endDate?: Date
}

export const RequestDetailsHeader = ({
  description,
  startDate,
  endDate,
}: RequestDetailsHeaderProps) => {
  const styles = useStyles()
  const { t } = useTranslation('requestVacation')
  return (
    <>
      <BackgroundPlant1 style={styles.plant1} />
      <BackgroundPlant2 style={styles.plant2} height={90} />
      <Box paddingLeft="s">
        <Text variant="heading4">{description || t('timeOffDescriptionPlaceholder')}</Text>
      </Box>
      <Box flexDirection="row" alignItems="center">
        <CalendarIcon />
        <Text variant="body1Bold">{getFormattedPeriod(startDate, endDate)}</Text>
      </Box>
    </>
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
