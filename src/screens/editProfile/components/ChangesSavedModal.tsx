import React, { FC, useEffect } from 'react'
import { Text } from 'react-native'
import { ModalProps } from 'react-native-modal'

import { CustomModal } from 'components/CustomModal'
import TickIcon from 'assets/icons/icon-button-tick.svg'
import { theme, BaseOpacity, mkUseStyles, Theme } from 'utils/theme/index'

type ChangesSavedModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: () => void
  isVisible?: boolean
  content: string
}

export const ChangesSavedModal: FC<ChangesSavedModalProps> = ({
  isVisible,
  hideModal,
  content,
}) => {
  const styles = useStyles()

  useEffect(() => {
    setTimeout(() => hideModal(), 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CustomModal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      backdropColor={theme.colors.white}
      backdropOpacity={0.8}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      swipeDirection="down"
      style={styles.modal}
      hideModalContentWhileAnimating>
      <BaseOpacity onPress={hideModal} flex={1} justifyContent="center" alignItems="center">
        <Text style={styles.confirmationMsg}>{content}</Text>
        <TickIcon />
      </BaseOpacity>
    </CustomModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    height: 315,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: -20,
    left: -20,
    right: -20,
    borderTopLeftRadius: theme.borderRadii.ml,
    borderTopRightRadius: theme.borderRadii.ml,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },

  confirmationMsg: {
    fontFamily: 'Nunito-Bold',
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 48,
  },
}))
