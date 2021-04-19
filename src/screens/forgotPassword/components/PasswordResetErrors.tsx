import React, { FC } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme/index'
import { CustomButton } from 'components/CustomButton'

type PasswordResetErrorsProps = {
  hideModal: () => void
  subTitle: 'errorEmailSubTitle' | 'errorRecoveryCodeSubTitle'
}

const EmailErrorImage = require('assets/Illustration_error_cone.png')
const RecoveryCodeErrorImage = require('assets/Illustration_error_sunglasses.png')

export const PasswordResetErrors: FC<PasswordResetErrorsProps> = ({ hideModal, subTitle }) => {
  const { t } = useTranslation('errorModals')

  return (
    <Box backgroundColor="lightGrey" alignItems="center" padding="lplus" borderRadius="mplus">
      <Text variant="boldBlack18">{t('errorTitle')}</Text>
      <Box marginVertical="xxl" borderRadius="xm">
        <Image
          source={subTitle === 'errorEmailSubTitle' ? EmailErrorImage : RecoveryCodeErrorImage}
        />
      </Box>
      <Box marginBottom="l">
        <Text variant="body1">{t(subTitle)}</Text>
      </Box>
      <Box paddingBottom="m">
        <TouchableOpacity onPress={hideModal} activeOpacity={1}>
          <CustomButton label={t('errorBtnText')} variant="blackBgButton" />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
