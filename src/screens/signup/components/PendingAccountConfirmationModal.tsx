import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { ModalProps } from 'react-native-modal'

import { CustomModal } from 'components/CustomModal'
import { FirstRegisterDialogBox } from 'components/FirstRegisterDialogBox'
import { theme } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'

type PendingAccountConfModalProps = Pick<ModalProps, 'isVisible'> & { onClose: () => void }

export const PendingAccountConfirmationModal: FC<PendingAccountConfModalProps> = ({
  isVisible,
  onClose,
}) => (
  <CustomModal
    isVisible={isVisible}
    onBackButtonPress={onClose}
    onBackdropPress={onClose}
    backdropColor={colors.white}
    animationInTiming={600}
    animationOutTiming={400}
    backdropTransitionInTiming={600}
    backdropTransitionOutTiming={400}
    backdropOpacity={0.8}
    style={styles.modal}
    hideModalContentWhileAnimating>
    {/* TODO matthew: When register and mutations will be ready
        !isConfirmed ? <FirstRegisterDialogBox /> : <SecondRegisterDialogBox /> */}
    <FirstRegisterDialogBox />
  </CustomModal>
)

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: theme.spacing.l,
  },
})
