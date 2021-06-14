import React, { FC, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ModalProps } from 'react-native-modal'

import { CustomModal } from 'components/CustomModal'
import { colors } from 'utils/theme/colors'
import { CalendarRequestVacation } from './CalendarRequestVacation'

type CalendarModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: () => void
  showModal?: () => void
  isConfirmed?: boolean
}

export const CalendarModal: FC<CalendarModalProps> = ({
  isVisible,
  hideModal,
  showModal,
  isConfirmed,
}) => {
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
const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 0,
  },
})
