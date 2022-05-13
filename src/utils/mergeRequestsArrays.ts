import { HolidailyRequestMonthType } from 'types/HolidayRequestMonthType'
import { sortByRequestDate } from './sortByDate'

export const mergeRequestsArrays = (
  arr1: HolidailyRequestMonthType[],
  arr2: HolidailyRequestMonthType[]
) => {
  const mergedMonths: HolidailyRequestMonthType[] = []
  arr1.forEach((x) => {
    arr2.forEach((y) => {
      if (x.date === y.date) {
        const days = [...x.days, ...y.days].sort(sortByRequestDate)
        mergedMonths.push({
          date: x.date,
          days,
        })
      }
    })
  })

  return mergedMonths
}
