import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { CustomButton } from 'components/CustomButton'
import ExlamationMark from 'assets/icons/icon-exclamation-mark.svg'

type EmptyFormProps = {
  onPress: F0
}

export const EmptyForm = (props: EmptyFormProps) => {
  const { t } = useTranslation('requestVacation')
  return (
    <>
      <Box flex={1} flexDirection="row" alignItems="flex-start">
        <Box
          marginRight="m"
          bg="errorRed"
          height={28}
          width={28}
          marginTop="none"
          borderRadius="full"
          alignItems="center"
          justifyContent="center">
          <ExlamationMark color="white" />
        </Box>
        <Box flex={1}>
          <Text variant="body1Bold" lineHeight={24}>
            {t('addRequestValidation')}
          </Text>
        </Box>
      </Box>
      <CustomButton label={t('understand')} variant="danger" onPress={props.onPress} />
    </>
  )
}
