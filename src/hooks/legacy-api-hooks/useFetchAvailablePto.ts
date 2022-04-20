// import { useQuery } from 'react-query'
// import { useState } from 'react'
// import { availablePtoQuery } from 'graphqlActions/queries/availablePtoQuery'
// import { FetchAvailablePtoQueryTypes } from 'types/useFetchAvailablePtoTypes'

// export const useFetchAvailablePto = () => {
//   const [availablePto, setAvailablePto] = useState(0)
//   const { isLoading, error } = useQuery('fetch-available-pto', availablePtoQuery, {
//     onSuccess: (data: FetchAvailablePtoQueryTypes) => {
//       setAvailablePto(data.availableDaysOff)
//     },
//   })

//   return { availablePto, isLoading, error }
// }
