import { FieldErrors } from 'react-hook-form'
import { TFunction } from 'react-i18next'

type GenerateInputErrorsTypes = {
  errors: FieldErrors
  name: string
  passwordsAreEqual?: boolean
  screenName?: string
  t: TFunction<'userProfile'>
}

export const generateInputErrors = ({
  errors,
  name,
  passwordsAreEqual,
  screenName,
  t,
}: GenerateInputErrorsTypes) => {
  if (errors[name]) {
    return errors[name].message
  }
  if (
    !errors[name] &&
    !passwordsAreEqual &&
    (screenName === 'NewPassword' || screenName === 'ChangePassword')
  ) {
    return t('passwordMatch')
  }
}
