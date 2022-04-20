// import { useTranslation } from 'react-i18next'
// import { useMutation } from 'react-query'

// import { createInviationsMutation } from 'graphqlActions/mutations/createInvitationsMutation'
// import { InvitationsTypes, CreateInvitationsTypes } from 'types/useCreateInvitationTypes'
// import { createAlert } from 'utils/createAlert'

// export const useCreateInvitations = () => {
//   const { t } = useTranslation('mutationsErrors')

//   const {
//     mutate: createInvitations,
//     isLoading,
//     isSuccess,
//   } = useMutation<
//     InvitationsTypes,
//     {
//       message: string
//     },
//     CreateInvitationsTypes
//   >(createInviationsMutation, {
//     onSuccess: (data: InvitationsTypes) => {
//       const invitations = data.createInvitations

//       createAlert(
//         'Invitation sent',
//         `Invitation code sent to: ${invitations.map((invitation) => invitation.email).join(', ')}`
//       )
//     },
//     onError: (error) => {
//       if (__DEV__) console.warn(error)
//       createAlert(t('default'), error.message)
//     },
//   })

//   return { createInvitations, isLoading, isSuccess }
// }
