import React from 'react'
import { Box, mkUseStyles, Text, theme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { displayDayShort, displayWeekday, prevWorkday, nextWorkday } from 'utils/functions'

type MateHolidayDetailProps = {
  type: 'start' | 'end'
  date: string
}

export const MateHolidayDetail = (props: MateHolidayDetailProps) => {
  const { date, type } = props
  const styles = useStyles()
  const { t } = useTranslation('dashboard')
  const header = type === 'start' ? 'lastDayAtWork' : 'backAtWork'
  const dateTobedisplay = type === 'start' ? prevWorkday(date) : nextWorkday(date)

  return (
    <Box
      flexBasis="49%"
      marginTop="s"
      padding="xm"
      style={type === 'start' ? styles.startBox : styles.endBox}>
      <Text variant="textBoldXS" color={type === 'start' ? 'headerGrey' : 'special'}>
        {t(header)}
      </Text>
      <Text variant="textBoldMD" textAlign="center" paddingTop="s">
        {displayDayShort(dateTobedisplay)}
      </Text>
      <Text variant="textSM" textAlign="center" paddingVertical="xs">
        {displayWeekday(dateTobedisplay)}
      </Text>
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  startBox: {
    backgroundColor: theme.colors.lightGrayOpaque,
    marginRight: theme.spacing.s,
    borderBottomLeftRadius: theme.borderRadii.lmin,
  },
  endBox: {
    backgroundColor: theme.colors.lightBlueOpaque,
    borderBottomRightRadius: theme.borderRadii.lmin,
  },
}))
