import React from 'react'
import { ModalProps } from 'react-native-modal'
import { useTranslation } from 'react-i18next'
import { Text, Box, BaseOpacity, mkUseStyles, useTheme } from 'utils/theme'
import { ConfirmationModalProps } from 'types/confirmationModalProps'
import { SvgProps } from 'react-native-svg'
import { CustomButton } from './CustomButton'
import { SwipeableModal } from './SwipeableModal'
import { CircleStatusIcon } from './CircleStatusIcon'

export const ConfirmationModal = ({
  isVisible,
  onAccept,
  onDecline,
  onDismiss,
  content,
  header,
  declineBtnText,
  acceptBtnText,
  statusIcon,
  hideRejectButton,
}: ConfirmationModalProps & Pick<ModalProps, 'isVisible'>) => {
  const styles = useModalStyles()
  const theme = useTheme()
  const { t } = useTranslation('confirmationModal')
  const statusIconProps: SvgProps = {
    color: theme.colors.white,
    height: '50%',
    width: '50%',
    style: {
      marginTop: theme.spacing.xs,
    },
  }
  // FIXME: Something in the drawer menu is intercepting the touch gestures, so a hack with wrapping CustomButton in BaseOpacity is needed for buttons to work
  // and a hack with full width & height BaseOpacity for backdrop press to work
  return (
    <SwipeableModal isOpen={isVisible} onHide={onDismiss ?? onDecline}>
      <Box style={styles.bottomModal}>
        {statusIcon && (
          <CircleStatusIcon
            status={statusIcon}
            height={64}
            iconProps={statusIconProps}
            marginBottom="ml"
          />
        )}
        {header !== null && <Text variant="displayBoldSM">{header || t('areYouSure')}</Text>}
        {content !== null && (
          <Text paddingTop="s" variant="textSM" textAlign="center">
            {content}
          </Text>
        )}
        <BaseOpacity activeOpacity={0.8} onPress={onAccept} marginBottom="xm" marginTop="xl">
          <CustomButton label={acceptBtnText ?? t('yes')} variant="primary" />
        </BaseOpacity>
        {!hideRejectButton && (
          <BaseOpacity activeOpacity={0.8} onPress={onDecline}>
            <CustomButton label={declineBtnText ?? t('no')} variant="secondary" />
          </BaseOpacity>
        )}
      </Box>
      <BaseOpacity
        onPress={onDismiss ?? onDecline}
        position="absolute"
        zIndex="-1"
        style={{ width: '100%', height: '100%' }}
      />
    </SwipeableModal>
  )
}

export const useModalStyles = mkUseStyles((theme) => ({
  bottomModal: {
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
  nativeModalStyleReset: {
    margin: 0,
  },
}))
