import { HolidayRequestMonthType } from 'types/HolidayRequestMonthType'
import { sortByRequestDate } from './sortByDate'

export const mergeRequestsArrays = (
  arr1: HolidayRequestMonthType[],
  arr2: HolidayRequestMonthType[]
) => {
  const mergedMonths: HolidayRequestMonthType[] = []
  const listOfMonths = arr1.map((month) => month.date)

  arr1.forEach((x) => {
    arr2.forEach((y) => {
      if (x.date === y.date) {
        let days = [...x.days, ...y.days]
        days = days
          .filter((value, index, self) => index === self.findIndex((t) => t.date === value.date))
          .sort(sortByRequestDate)

        mergedMonths.push({
          date: y.date,
          days,
        })
      }

      if (!listOfMonths.includes(y.date)) {
        mergedMonths.push({
          date: y.date,
          days: y.days,
        })
        listOfMonths.push(y.date)
      }
    })
  })

  return mergedMonths
}
