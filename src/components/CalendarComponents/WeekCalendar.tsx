import React, { useState, useEffect } from 'react'
import { Box } from 'utils/theme'
import { DateObject, MultiDotMarking } from 'react-native-calendars'
import { addDays, isToday, startOfWeek } from 'date-fns/esm'
import { isSameDay } from 'date-fns'
import { CalendarDay } from './CalendarDay'

type WeekCalendarProps = {
  date: Date
  markedDates: { [key: string]: MultiDotMarking }
  onDayPress: F1<DateObject>
}

export const WeekCalendar = ({ date: currentDate, onDayPress, markedDates }: WeekCalendarProps) => {
  const [week, setWeek] = useState<Date[]>([])
  useEffect(() => {
    const newWeek = []
    for (let i = 0; i < 7; i++) {
      newWeek.push(addDays(startOfWeek(currentDate), i))
    }
    setWeek(newWeek)
  }, [currentDate])

  const getDateObject = (date: Date) => ({
    dateString: date.toISOString(),
    day: date.getDay(),
    month: date.getMonth(),
    year: date.getFullYear(),
    timestamp: date.getTime(),
  })

  const getState = (date: Date) => {
    if (date.getMonth() !== currentDate.getMonth()) return 'disabled'
    if (isToday(date)) return 'today'
    return ''
  }

  const getMarking = (date: Date) => {
    const isSelected = isSameDay(date, currentDate)
    const marking =
      date.toISOString() in markedDates ? markedDates[date.toISOString()] : { dots: [] }

    return {
      selected: isSelected,
      ...marking,
    }
  }

  return (
    <Box flexDirection="row" justifyContent="space-around" style={{ marginHorizontal: 5 }}>
      {week.map((day) => (
        <Box key={day.toISOString()}>
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
