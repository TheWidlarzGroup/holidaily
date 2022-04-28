import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ModalProps } from 'react-native-modal'
import { useTranslation } from 'react-i18next'
import { CustomModal } from 'components/CustomModal'
import { theme, mkUseStyles, Theme, Text, Box } from 'utils/theme'
import { ConfirmationModalProps } from 'types/confirmationModalProps'
import { CustomButton } from './CustomButton'

export const ConfirmationModal = ({
  isVisible,
  hideModal,
  onAccept,
  onDecline,
  content,
  header,
  declineBtnText,
  acceptBtnText,
}: ConfirmationModalProps & Pick<ModalProps, 'isVisible'>) => {
  const styles = useStyles()
  const { t } = useTranslation('confirmationModal')

  return (
    <CustomModal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      onBackButtonPress={hideModal}
      swipeThreshold={20}
      backdropColor={theme.colors.white}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection="down"
      style={styles.modal}
      hideModalContentWhileAnimating>
      <Box justifyContent="center" alignItems="center" paddingHorizontal="m">
        {header !== null && (
          <Text variant="boldBlackCenter20" marginBottom="l">
            {header || t('areYouSure')}
          </Text>
        )}
        {content !== null && (
          <Text variant="body1" marginBottom="xxl">
            {content}
          </Text>
        )}
        <Box marginBottom="xm">
          <TouchableOpacity onPress={onDecline} activeOpacity={1}>
            <CustomButton
              label={declineBtnText ?? t('no')}
              variant="secondary"
              width={221}
              height={53}
            />
          </TouchableOpacity>
        </Box>
        <Box>
          <TouchableOpacity onPress={onAccept} activeOpacity={1}>
            <CustomButton
              label={acceptBtnText ?? t('yes')}
              variant="blackBgButton"
              width={221}
              height={53}
            />
          </TouchableOpacity>
        </Box>
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
