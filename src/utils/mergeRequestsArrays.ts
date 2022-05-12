import { MonthType } from 'hooks/useGetHolidayRequests'
import { sortByRequestDate } from './sortByDate'

export const mergeRequestsArrays = (arr1: MonthType[], arr2: MonthType[]) => {
  const mergedMonths: MonthType[] = []
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
