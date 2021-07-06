import React, { FC, useEffect } from 'react'
import { ModalProps } from 'react-native-modal'
import { CustomModal } from 'components/CustomModal'
import { mkUseStyles, Theme } from 'utils/theme'
import { colors } from 'utils/theme/colors'
import { Confetti } from 'components/Confetti'
import { FirstRegisterDialogBox } from './FirstRegisterDialogBox'
import { SecondRegisterDialogBox } from './SecondRegisterDialogBox'

type PendingAccountConfModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: () => void
  showModal?: () => void
  isConfirmed?: boolean
}

export const PendingAccountConfirmationModal: FC<PendingAccountConfModalProps> = ({
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
    <>
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
        {!isConfirmed ? (
          <FirstRegisterDialogBox />
        ) : (
          <>
            <Confetti origin={{ x: -40, y: -10 }} />
            <SecondRegisterDialogBox hideModal={hideModal} />
          </>
        )}
      </CustomModal>
    </>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    paddingHorizontal: theme.spacing.l,
    justifyContent: 'center',
  },
}))
