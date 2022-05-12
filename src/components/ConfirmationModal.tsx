import React from 'react'
import { ModalProps } from 'react-native-modal'
import { useTranslation } from 'react-i18next'
import { mkUseStyles, Theme, Text, Box, BaseOpacity } from 'utils/theme'
import { ConfirmationModalProps } from 'types/confirmationModalProps'
import { CustomButton } from './CustomButton'
import { SwipeableModal } from './SwipeableModal'

export const ConfirmationModal = ({
  isVisible,
  onAccept,
  onDecline,
  content,
  header,
  declineBtnText,
  acceptBtnText,
}: ConfirmationModalProps & Pick<ModalProps, 'isVisible'>) => {
  const styles = useStyles()
  const { t } = useTranslation('confirmationModal')

  // FIXME: Something in the drawer menu is intercepting the touch gestures, so a hack with wrapping CustomButton in BaseOpacity is needed for buttons to work
  // and a hack with full width & height BaseOpacity for backdrop press to work
  return (
    <SwipeableModal isOpen={isVisible} onHide={onDecline} hideModalContentWhileAnimating>
      <Box style={styles.modal}>
        {header !== null && <Text variant="displayBoldSM">{header || t('areYouSure')}</Text>}
        {content !== null && <Text variant="textSM">{content}</Text>}
        <BaseOpacity activeOpacity={0.8} onPress={onAccept} marginBottom="xm" marginTop="xl">
          <CustomButton label={acceptBtnText ?? t('yes')} variant="primary" />
        </BaseOpacity>
        <BaseOpacity activeOpacity={0.8} onPress={onDecline}>
          <CustomButton label={declineBtnText ?? t('no')} variant="secondary" />
        </BaseOpacity>
      </Box>
      <BaseOpacity
        onPress={onDecline}
        position="absolute"
        zIndex="-1"
        style={{ width: '100%', height: '100%' }}
      />
    </SwipeableModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    paddingVertical: theme.spacing.l,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.l2plus,
    marginTop: 'auto',
    borderTopLeftRadius: theme.borderRadii.l2min,
    borderTopRightRadius: theme.borderRadii.l2min,
    alignItems: 'center',
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
}))
