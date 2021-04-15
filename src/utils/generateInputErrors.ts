import { FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type GenerateInputErrorsTypes = {
  errors: FieldErrors
  name: string
  passwordsAreEqual?: boolean
  screenName?: string
}

export const generateInputErrors = ({
  errors,
  name,
  passwordsAreEqual,
  screenName,
}: GenerateInputErrorsTypes) => {
  const { t } = useTranslation('inputErrors')
  if (errors[name]) {
    return errors[name].message
  }
  if (!errors[name] && !passwordsAreEqual && screenName === 'NewPassword') {
    return t('passwordMatch')
  }
}
