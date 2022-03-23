import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { createAlert } from 'utils/createAlert'
import {
  ErrorTypes,
  RequestHolidaysDataTypes,
  RequestHolidaysTypes,
} from 'types/useRequestHolidaysTypes'
import { requestHolidaysMutation } from 'legacy/graphql/mutations/requestHolidaysMutation'

export const useRequestHolidays = () => {
  const { t } = useTranslation('mutationsErrors')
  const {
    mutate: handleRequestHolidays,
    isLoading,
    isSuccess,
  } = useMutation<RequestHolidaysDataTypes, ErrorTypes, RequestHolidaysTypes>(
    requestHolidaysMutation,
    {
      onError: () => {
        createAlert(t('default'), '')
      },
    }
  )

  return { handleRequestHolidays, isLoading, isSuccess }
}
