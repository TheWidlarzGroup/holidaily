import React, { useState, useEffect } from 'react'
import { Box } from 'utils/theme'
import { DateTime } from 'luxon'
import { DateObject, MultiDotMarking } from 'react-native-calendars'
import { CalendarDay } from './CalendarDay'

type WeekCalendarProps = {
  date: DateTime
  markedDates: { [key: string]: MultiDotMarking }
  onDayPress: F1<DateObject>
}

export const WeekCalendar = ({ date: currentDate, onDayPress, markedDates }: WeekCalendarProps) => {
  const [week, setWeek] = useState<DateTime[]>([])
  useEffect(() => {
    const newWeek = []
    for (let i = 0; i < 7; i++) {
      newWeek.push(currentDate.startOf('week').plus({ day: i }))
    }
    setWeek(newWeek)
  }, [currentDate])

  const getDateObject = (date: DateTime) => ({
    dateString: date.toISODate(),
    day: date.day,
    month: date.month,
    year: date.year,
    timestamp: date.toMillis(),
  })

  const getState = (date: DateTime) => {
    if (date.month !== currentDate.month) return 'disabled'
    if (
      date.year === DateTime.now().year &&
      date.month === DateTime.now().month &&
      date.day === DateTime.now().day
    )
      return 'today'
    return ''
  }

  const getMarking = (date: DateTime) => {
    const isSelected =
      date.year === currentDate.year &&
      date.month === currentDate.month &&
      date.day === currentDate.day
    const marking = date.toISODate() in markedDates ? markedDates[date.toISODate()] : { dots: [] }

    return {
      selected: isSelected,
      ...marking,
    }
  }

  return (
    <Box flexDirection="row" justifyContent="space-around" style={{ marginHorizontal: 5 }}>
      {week.map((day) => (
        <Box key={day.toISODate()}>
          <CalendarDay
            marking={getMarking(day)}
            date={getDateObject(day)}
            state={getState(day)}
            onPress={onDayPress}
          />
        </Box>
      ))}
    </Box>
  )
}
