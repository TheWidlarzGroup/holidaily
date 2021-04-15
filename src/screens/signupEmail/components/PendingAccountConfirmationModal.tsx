import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { ModalProps } from 'react-native-modal'

import { CustomModal } from 'components/CustomModal'
import { FirstRegisterDialogBox } from './FirstRegisterDialogBox'
import { SecondRegisterDialogBox } from './SecondRegisterDialogBox'
import { theme } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'

type PendingAccountConfModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: () => void
  isConfirmed?: boolean
}

export const PendingAccountConfirmationModal: FC<PendingAccountConfModalProps> = ({
  isVisible,
  hideModal,
  isConfirmed,
}) => {
  console.log(isConfirmed)
  console.log(isVisible)
  return (
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
      {isConfirmed ? <FirstRegisterDialogBox /> : <SecondRegisterDialogBox hideModal={hideModal} />}
    </CustomModal>
  )
}
const styles = StyleSheet.create({
  modal: {
    marginHorizontal: theme.spacing.l,
  },
})
