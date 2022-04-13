import React from 'react'
import { ModalProps } from 'react-native-modal'
import { Box, Text } from 'utils/theme'
import { CustomButton } from 'components/CustomButton'
import { useTranslation } from 'react-i18next'
import { BottomModal } from 'components/BottomModal'

type RequestSentProps = Pick<ModalProps, 'isVisible'> & {
  onPressSee: F0
  onPressAnother: F0
  onPressOk: F0
}

export const RequestSent = ({
  isVisible,
  onPressSee,
  onPressAnother,
  onPressOk,
}: RequestSentProps) => {
  const { t } = useTranslation('requestVacation')
  return (
    <BottomModal isVisible={isVisible} coverScreen>
      <Box
        alignItems="center"
        paddingHorizontal="xxl"
        flex={1}
        paddingBottom="xl"
        justifyContent="flex-end">
        <Text variant="heading4" marginBottom="xxl">
          {t('sent')}
        </Text>
        <Text variant="body1" marginBottom="l">
          {t('waitForApproval')}
        </Text>
        <Text variant="body1">{t('findRequests')}</Text>
        <Box marginTop="xl">
          <Box marginVertical="xs">
            <CustomButton label={t('seeRequest')} onPress={onPressSee} />
          </Box>
          <Box marginVertical="xs">
            <CustomButton label={t('addAnother')} onPress={onPressAnother} />
          </Box>
          <Box marginVertical="xs">
            <CustomButton label={t('ok')} variant="blackBgButton" onPress={onPressOk} />
          </Box>
        </Box>
      </Box>
    </BottomModal>
  )
}
