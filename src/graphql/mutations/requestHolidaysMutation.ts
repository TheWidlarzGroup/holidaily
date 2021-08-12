import { gql } from 'graphql-request'
import { client } from 'graphqlActions/client'
import { RequestHolidaysTypes } from 'types/useRequestHolidaysTypes'

export const requestHolidaysMutation = ({
  startDate,
  endDate,
  description,
  sickTime,
  message,
}: RequestHolidaysTypes) =>
  client.request(
    gql`
      mutation {
        requestHolidays(
          startDate: "${startDate}",
          endDate: "${endDate}",
          description: "${description}",
          sickTime: ${sickTime},
          message: "${message}"
        ) {
          id
          range
          status
        }
      }
    `
  )
