import { CustomButton } from 'components/CustomButton'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from 'utils/theme'

type ButtonPressHandlers = {
  onPressSee: F0
  onPressAnother: F0
  onPressOk: F0
}

export const RequestSentButtons = (p: ButtonPressHandlers) => {
  const { t } = useTranslation('requestVacation')
  return (
    <Box marginTop="xl">
      <RequestSentButton label={t('seeRequest')} onPress={p.onPressSee} />
      <RequestSentButton label={t('addAnother')} onPress={p.onPressAnother} />
      <RequestSentButton label={t('ok')} isSpecial onPress={p.onPressOk} />
    </Box>
  )
}
type ButtonProps = {
  label: string
  onPress: F0
  isSpecial?: true
}
const RequestSentButton = ({ label, onPress, isSpecial }: ButtonProps) => (
  <Box marginVertical="xs">
    <CustomButton
      label={label}
      variant={isSpecial ? 'blackBgButton' : undefined}
      onPress={onPress}
    />
  </Box>
)
