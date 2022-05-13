import { DayOffEvent } from '../screens/calendar/components/DayEvent'

// FIXME moved here because of dependency cycle
export type DayInfoProps = {
  date: string
  events?: DayOffEvent[]
  weekend?: number
}
