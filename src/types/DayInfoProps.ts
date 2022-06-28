import { DayOffEvent } from '../screens/calendar/components/DayEvent'

export type DayInfoProps = {
  date: string
  events?: DayOffEvent[]
  weekend?: number
}
