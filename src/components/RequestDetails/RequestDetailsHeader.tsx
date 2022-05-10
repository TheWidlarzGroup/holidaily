import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme/index'
import { getFormattedPeriod } from 'utils/dates'
import CalendarIcon from 'assets/icons/icon-calendar.svg'
import { useTranslation } from 'react-i18next'

type RequestDetailsHeaderProps = {
  description?: string
  startDate?: Date | string
  endDate?: Date | string
}

export const RequestDetailsHeader = ({
  description,
  startDate,
  endDate,
}: RequestDetailsHeaderProps) => {
  if (typeof startDate === 'string') startDate = new Date(startDate)
  if (typeof endDate === 'string') endDate = new Date(endDate)
  const { t } = useTranslation('requestVacation')
  const styles = useStyles()

  return (
    <>
      <Box paddingHorizontal="s">
        <Text variant="heading4">{description || t('timeOffDescriptionPlaceholder')}</Text>
      </Box>
      <Box flexDirection="row" alignItems="center" paddingHorizontal="xxm" paddingTop="m">
        <CalendarIcon color={styles.calendar.color} />
        <Text variant="body1Bold" paddingLeft="xm">
          {getFormattedPeriod(startDate, endDate)}
        </Text>
      </Box>
    </>
  )
}

const useStyles = mkUseStyles((theme) => ({
  calendar: {
    color: theme.colors.tertiary,
  },
}))
