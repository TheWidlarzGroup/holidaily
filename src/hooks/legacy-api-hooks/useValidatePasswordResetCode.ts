// import { useMutation } from 'react-query'
// import { useState } from 'react'
// import { useTranslation, TFunction } from 'react-i18next'

// import { ErrorTypes } from 'types/useLoginTypes'
// import {
//   ValidatePasswordResetCodeArgumentsTypes,
//   ValidatePasswordResetCodeTypes,
// } from 'types/useValidatePasswordResetCodeTypes'
// import { validatePasswordResetCodeMutation } from 'graphqlActions/mutations/validatePasswordResetCodeMutation'

// const customErrorMessage = (translate: TFunction<'mutationsErrors'>, errorMessage: string) => {
//   if (errorMessage?.startsWith('invalid_credentials')) {
//     return translate('invalidCredentials')
//   }
//   return translate('default')
// }

// export const useValidatePasswordResetCode = () => {
//   const { t } = useTranslation('mutationsErrors')
//   const [validatePasswordResetCodeErrorMessage, setValidatePasswordResetCodeErrorMessage] =
//     useState('')
//   const {
//     mutate: handleValidatePasswordResetCode,
//     isLoading,
//     isSuccess,
//   } = useMutation<
//     ValidatePasswordResetCodeTypes,
//     ErrorTypes,
//     ValidatePasswordResetCodeArgumentsTypes
//   >(validatePasswordResetCodeMutation, {
//     onError: (error) => {
//       setValidatePasswordResetCodeErrorMessage(customErrorMessage(t, error.message))
//     },
//   })

//   return {
//     handleValidatePasswordResetCode,
//     isLoading,
//     validatePasswordResetCodeErrorMessage,
//     isSuccess,
//   }
// }
