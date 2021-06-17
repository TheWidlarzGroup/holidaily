import React from 'react'
import { ModalProps } from 'react-native-modal'
import { useTranslation } from 'react-i18next'
import { CustomModal } from 'components/CustomModal'
import { theme, mkUseStyles, Theme, Text, Box } from 'utils/theme/index'
import { CustomButton } from './CustomButton'

type ConfirmationModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
  onAccept: F0
  onDecline: F0
  content: string
}
export const ConfirmationModal = ({
  isVisible,
  hideModal,
  onAccept,
  onDecline,
  content,
}: ConfirmationModalProps) => {
  const styles = useStyles()
  const { t } = useTranslation('confirmationModal')

  return (
    <CustomModal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      backdropColor={theme.colors.white}
      backdropOpacity={0.8}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection="down"
      style={styles.modal}
      hideModalContentWhileAnimating>
      <Box justifyContent="center" alignItems="center">
        <Text variant="boldBlackCenter20" marginBottom="l">
          {t('areYouSure')}
        </Text>
        <Text variant="body1" marginBottom="xxl">
          {content}
        </Text>
        <CustomButton
          label={t('yes')}
          variant="blackBgButton"
          onPress={onAccept}
          width={221}
          height={53}
          marginBottom={theme.spacing.xm}
        />
        <CustomButton
          height={53}
          width={221}
          label={t('no')}
          variant="secondary"
          onPress={onDecline}
        />
      </Box>
    </CustomModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    height: 350,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: -20,
    left: -20,
    right: -20,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
}))
