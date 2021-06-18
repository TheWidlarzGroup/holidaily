import React, { FC, useEffect } from 'react'
import { ModalProps } from 'react-native-modal'

import { CustomModal } from 'components/CustomModal'
import { colors } from 'utils/theme/colors'
import { CalendarRequestVacation } from './CalendarRequestVacation'
import { mkUseStyles } from 'utils/theme'

type CalendarModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
  showModal?: F0
  isConfirmed?: boolean
}

export const CalendarModal: FC<CalendarModalProps> = ({
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
      <CalendarRequestVacation />
    </CustomModal>
  )
}

const useStyles = mkUseStyles((theme) => ({
  modal: {
    flex: 1,
    position: 'absolute',
    top: 20,
    left: -20,
    right: -20,
    marginTop: theme.spacing.lplus,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
}))
