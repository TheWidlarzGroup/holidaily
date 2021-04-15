import { FieldErrors } from 'react-hook-form'

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
  if (errors[name] && !errors[name].message) {
    return 'This field is required'
  } else if (errors[name]) {
    return errors[name].message
  } else if (!errors[name] && !passwordsAreEqual && screenName === 'NewPassword') {
    return 'Password must match'
  }
}
