export type RequestHolidaysTypes = {
  startDate: string
  endDate: string
  description: string
  message?: string
  sickTime?: boolean
}

export type RequestHolidaysDataTypes = {
  requestHolidays: {
    id: string
    range: string[]
    status: string
  }
}

export type ErrorTypes = {
  message: string
}
