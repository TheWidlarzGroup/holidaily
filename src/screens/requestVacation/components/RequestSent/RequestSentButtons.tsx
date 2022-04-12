import { CustomButton } from 'components/CustomButton'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from 'utils/theme'

type ButtonPressHandlers = {
  onPressSee: F0
  onPressAnother: F0
  onPressOk: F0
}

export const RequestSentButtons = ({
  onPressSee,
  onPressAnother,
  onPressOk,
}: ButtonPressHandlers) => {
  const { t } = useTranslation('requestVacation')
  return (
    <Box marginTop="xl">
      <Button label={t('seeRequest')} onPress={onPressSee} />
      <Button label={t('addAnother')} onPress={onPressAnother} />
      <Button label={t('ok')} isSpecial onPress={onPressOk} />
    </Box>
  )
}
type ButtonProps = {
  label: string
  onPress: F0
  isSpecial?: true
}
const Button = ({ label, onPress, isSpecial }: ButtonProps) => (
  <Box marginVertical="xs">
    <CustomButton
      label={label}
      variant={isSpecial ? 'blackBgButton' : undefined}
      onPress={onPress}
    />
  </Box>
)
