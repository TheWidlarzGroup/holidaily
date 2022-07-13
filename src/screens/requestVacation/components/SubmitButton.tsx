import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomButton } from 'components/CustomButton'
import { BaseOpacity, Box, useTheme } from 'utils/theme'
import { isIos } from 'utils/layout'

type SaveChangesButtonProps = {
  onPress: F0
  handleValidation: F0
  isDisabled: boolean
  isLoading: boolean
  step: number
}

export const SubmitButton = ({
  onPress,
  handleValidation,
  isDisabled,
  isLoading,
  step,
}: SaveChangesButtonProps) => {
  const { t } = useTranslation('requestVacation')
  const theme = useTheme()

  return (
    <Box
      position="absolute"
      right={0}
      left={0}
      bottom={0}
      backgroundColor="dashboardBackground"
      alignItems="center"
      justifyContent="center"
      paddingBottom={isIos ? 'xl' : 'm'}>
      <BaseOpacity onPress={handleValidation} backgroundColor="dashboardBackground">
        <CustomButton
          loading={isLoading}
          marginHorizontal={theme.spacing.lplus}
          marginTop={theme.spacing.xm}
          disabled={isDisabled}
          label={t(step === 0 ? 'CTA' : 'sendRequest')}
          variant="primary"
          onPress={onPress}
        />
      </BaseOpacity>
    </Box>
  )
}
