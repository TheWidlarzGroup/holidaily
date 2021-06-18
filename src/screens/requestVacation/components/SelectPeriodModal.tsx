import React, { FC, useEffect } from 'react'
import { ModalProps } from 'react-native-modal'

import { CustomModal } from 'components/CustomModal'
import { colors } from 'utils/theme/colors'
import { Text, mkUseStyles } from 'utils/theme'

type SelectPeriodModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
  showModal?: F0
  isConfirmed?: boolean
}

export const SelectPeriodModal: FC<SelectPeriodModalProps> = ({
  isVisible,
  hideModal,
  showModal,
  isConfirmed,
}) => {
  const styles = useStyles()

  useEffect(() => {
    if (!isConfirmed || !showModal) return
    showModal()
  }, [isConfirmed, showModal])

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
      <Text variant="body1Bold"> 18 Jun</Text>
    </CustomModal>
  )
}

const useStyles = mkUseStyles((theme) => ({
  modal: {
    flex: 1,
    position: 'absolute',
    bottom: -20,
    left: -20,
    right: -20,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    backgroundColor: theme.colors.primary,
    height: 180,
    padding: 20,
  },
}))
