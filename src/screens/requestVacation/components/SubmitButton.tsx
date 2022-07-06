import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomButton } from 'components/CustomButton'
import { Box, useTheme, BaseOpacity } from 'utils/theme'

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
    <BaseOpacity
      hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }}
      onPress={handleValidation}
      backgroundColor="alwaysDarkenWhite">
      <Box
        position="absolute"
        right={0}
        left={0}
        bottom={0}
        backgroundColor="alwaysDarkenWhite"
        alignItems="center"
        justifyContent="center"
        paddingBottom="xl">
        <CustomButton
          loading={isLoading}
          marginHorizontal={theme.spacing.lplus}
          marginTop={theme.spacing.xm}
          disabled={isDisabled}
          label={t(step === 0 ? 'CTA' : 'sendRequest')}
          variant="primary"
          onPress={onPress}
        />
      </Box>
    </BaseOpacity>
  )
}
