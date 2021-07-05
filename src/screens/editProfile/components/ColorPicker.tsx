import React, { useEffect } from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import { CustomModal } from 'components/CustomModal'
import { mkUseStyles, Theme, Text } from 'utils/theme'
import IconBack from 'assets/icons/icon-back-white.svg'

type ColorPickerProps = {
  hideModal: F0
}

export const ColorPicker = ({ hideModal }: ColorPickerProps) => {
  const styles = useStyles()
  useEffect(() => {
    StatusBar.setBackgroundColor('rgba(0,0,0,0.85)')
    return () => StatusBar.setBackgroundColor('white')
  }, [])

  return (
    <CustomModal
      isVisible
      onBackdropPress={hideModal}
      backdropOpacity={0.85}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection="down"
      style={styles.modal}
      hideModalContentWhileAnimating>
      <TouchableOpacity activeOpacity={0.2} onPress={hideModal} style={styles.backBtn}>
        <IconBack />
      </TouchableOpacity>
      <Text variant="resendWhite">{'Pick your favourite color'}</Text>
    </CustomModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    backgroundColor: theme.colors.transparent,
  },
  backBtn: {
    position: 'absolute',
    zIndex: theme.zIndices['5'],
  },
}))
