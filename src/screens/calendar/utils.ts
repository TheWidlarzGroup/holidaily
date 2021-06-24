import { ViewStyle } from 'react-native'
import { theme } from 'utils/theme'
import { DayInfoProps } from 'screens/calendar/components/DayInfo'
import { DayOffEvent } from './components/DayEvent'

export const weekendBasedStyles = (weekend: number) => {
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

export const getMarkedDates = (days: DayInfoProps[]) =>
  days
    .filter((day) => day.events?.length)
    .reduce(
      (_, { date, events = [] }) => ({
        [date]: {
          dots: events.map((event: DayOffEvent) => ({
            key: event.person,
            color: event.color,
          })),
        },
      }),
      {}
    )
