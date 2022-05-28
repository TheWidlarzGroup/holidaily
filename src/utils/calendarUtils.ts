import type { ViewStyle } from 'react-native'
import type { DayInfoProps } from 'types/DayInfoProps'
import type { DayOffEvent } from 'screens/calendar/components/DayEvent'
import type { Theme } from './theme'
import { getDatesBetween } from './dates'

export type MarkedDateType = {
  selected?: boolean
  color?: string
  endingDay?: boolean
  startingDay?: boolean
  period?: boolean
  isInvalid?: boolean
}

type GenMarkDatesProps = {
  start?: string
  end?: string
  isInvalid?: boolean
  days?: DayInfoProps[]
}

export const genCalendarListMarkedDates = (p: GenMarkDatesProps) => {
  if (!p.start || !p.end) return {}
  const calendarDatesObj: { [key: string]: MarkedDateType } = {}
  const dates = getDatesBetween(p.start, p.end)

  const getDots = () => {
    if (!p.days) return {}
    return getDayDots(p.days)
  }

  dates.forEach((date, idx) => {
    calendarDatesObj[date] = {
      period: true,
      startingDay: idx === 0,
      endingDay: idx === dates.length - 1,
      isInvalid: p.isInvalid,
      ...getDots(),
    }
  })

  return calendarDatesObj
}

export const getDayDots = (days: Required<GenMarkDatesProps>['days']) =>
  days
    .filter((day) => day.events?.length)
    .reduce(
      (o, { date, events = [] }) => ({
        ...o,
        [date]: {
          dots: events.map((event: DayOffEvent) => ({
            key: event.id,
            color: event.color,
          })),
        },
      }),
      {}
    )
export const weekendBasedStyles = (weekend: number, theme: Theme) => {
  let styles: ViewStyle = {}
  if (weekend === 1) {
    styles = {
      borderTopLeftRadius: theme.borderRadii.lmin,
      borderTopRightRadius: theme.borderRadii.lmin,
      marginTop: theme.spacing.s,
      borderBottomWidth: 1,
    }
  } else if (weekend === 2) {
    styles = {
      borderBottomLeftRadius: theme.borderRadii.lmin,
      borderBottomRightRadius: theme.borderRadii.lmin,
      marginBottom: theme.spacing.s,
    }
  }
  return styles
}
