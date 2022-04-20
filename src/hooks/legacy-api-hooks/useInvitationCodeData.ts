// import { useQuery } from 'react-query'

// import { useCallback, useState } from 'react'
// import { invitationCodeQuery } from 'graphqlActions/queries/invitationCodeQuery'
// import { StackActions, useNavigation } from '@react-navigation/native'
// import { createAlert } from 'utils/createAlert'

// type InvitationCodeDataType = {
//   checkInvitation: {
//     email: string
//     expired: boolean
//     user: {
//       name: string
//       organization: {
//         name: string
//       }
//     }
//   }
// }

// export const useInvitationCodeData = () => {
//   const [data, setData] = useState({ code: '', email: '', organizationName: '' })
//   const navigation = useNavigation()
//   useQuery(['invitation-code', data.code], () => invitationCodeQuery(data.code), {
//     onSuccess: (data: InvitationCodeDataType) => {
//       console.log(data)
//       if (data.checkInvitation.expired) {
//         createAlert('Invitation code expired', '')
//         navigation.dispatch(StackActions.replace('Slider'))
//       } else {
//         setData((prevState) => ({
//           ...prevState,
//           email: data.checkInvitation.email,
//           organizationName: data.checkInvitation.user.organization.name,
//         }))
//       }
//     },
//     enabled: data.code.length >= 6,
//   })
//   const setCode = useCallback(
//     (code: string) => {
//       setData((prevState) => ({
//         ...prevState,
//         code,
//       }))
//     },
//     [setData]
//   )
//   return { data, setCode }
// }
