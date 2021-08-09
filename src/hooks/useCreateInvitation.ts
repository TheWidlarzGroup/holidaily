import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

import { createInviationMutation } from 'graphqlActions/mutations/createInvitationMutation'
import { InvitationTypes, CreateInvitationTypes } from 'types/useCreateInvitationTypes'
import { createAlert } from 'utils/createAlert'

export const useCreateInvitation = () => {
  const { t } = useTranslation('mutationsErrors')

  const { mutate: createInvitation, isLoading } = useMutation<
    InvitationTypes,
    {
      message: string
    },
    CreateInvitationTypes
  >(createInviationMutation, {
    onSuccess: (data: InvitationTypes) => {
      const { email } = data.createInvitation

      createAlert('Invitation sent', `Invitation code sent to: ${email}`)
    },
    onError: (error) => {
      if (__DEV__) console.warn(error)
      createAlert(t('default'), error.message)
    },
  })

  return { createInvitation, isLoading }
}
