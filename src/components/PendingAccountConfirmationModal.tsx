import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

import { CustomModal } from './CustomModal'
import { FirstRegisterDialogBox } from './FirstRegisterDialogBox'
import { theme } from '../utils/theme/index'
import { colors } from '../utils/theme/colors'

type PendingAccountConfModalProps = {
  isVisible: boolean
  setFalse: () => void
}

export const PendingAccountConfirmationModal: FC<PendingAccountConfModalProps> = ({
  isVisible,
  setFalse,
}) => (
  <CustomModal
    isVisible={isVisible}
    onBackButtonPress={setFalse}
    onBackdropPress={setFalse}
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
