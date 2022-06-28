import React from 'react'
import { StyleSheet } from 'react-native'
import { ModalProps } from 'react-native-modal'

import { CustomModal } from 'components/CustomModal'
import { theme } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'
import { UpdateModalChildren } from './UpdateModalChildren'

type PasswordUpdatedModalProps = Pick<ModalProps, 'isVisible'> & { hideModal: () => void }

export const PasswordUpdatedModal = ({ isVisible, hideModal }: PasswordUpdatedModalProps) => (
  <CustomModal
    isVisible={isVisible}
    onBackButtonPress={hideModal}
    onBackdropPress={hideModal}
    backdropColor={colors.white}
    animationInTiming={500}
    animationOutTiming={500}
    backdropTransitionInTiming={500}
    backdropTransitionOutTiming={500}
    backdropOpacity={0.8}
    style={styles.modal}
    hideModalContentWhileAnimating>
    <UpdateModalChildren />
  </CustomModal>
)

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: theme.spacing.l,
  },
})
