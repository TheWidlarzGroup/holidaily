import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBar, TouchableOpacity } from 'react-native'
import { CustomModal } from 'components/CustomModal'
import { mkUseStyles, Theme, Text, Box } from 'utils/theme'
import IconBack from 'assets/icons/icon-back-white.svg'
import ArrowRight from 'assets/icons/arrow-right.svg'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { useModalContext } from 'contexts/ModalProvider'
import { COLORS } from '../helpers/mockedData'

type ColorPickerProps = {
  hidePickerModal: F0
  setUserColor: React.Dispatch<React.SetStateAction<string>>
}
type ColorProps = {
  id: number
  color: string
}

export const ColorPicker = ({ hidePickerModal, setUserColor }: ColorPickerProps) => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  const { showModal, hideModal } = useModalContext()
  const [selectedColor, setSelectedColor] = useState('transparent')
  useEffect(() => {
    StatusBar.setBackgroundColor('rgba(0,0,0,0.85)')
    return () => StatusBar.setBackgroundColor('white')
  }, [])

  const handleSelectColor = (item: ColorProps) => setSelectedColor(item.color)
  const handleSubmitColor = () => {
    setUserColor(selectedColor)
    hidePickerModal()
    showModal(<ChangesSavedModal isVisible content={t('newColorSaved')} hideModal={hideModal} />)
  }

  return (
    <CustomModal
      isVisible
      onBackdropPress={hidePickerModal}
      backdropOpacity={0.85}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection="down"
      style={styles.modal}
      hideModalContentWhileAnimating>
      <TouchableOpacity activeOpacity={0.2} onPress={hidePickerModal} style={styles.backBtn}>
        <IconBack />
      </TouchableOpacity>
      <Text variant="boldWhite24" marginTop="xxl">
        {'Pick your favourite color'}
      </Text>
      <Box marginBottom="xxxl" marginTop="l" flexDirection="row" flexWrap="wrap">
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color.id}
            onPress={() => handleSelectColor(color)}
            style={{
              backgroundColor: color.color,
              width: 20,
              height: 20,
              marginHorizontal: 10,
              borderRadius: 20,
            }}
          />
        ))}
      </Box>
      <TouchableOpacity onPress={handleSubmitColor}>
        <Box width={56} height={56} style={{ backgroundColor: selectedColor }} borderRadius="full">
          {selectedColor !== 'transparent' && <ArrowRight style={styles.arrow} />}
        </Box>
      </TouchableOpacity>
    </CustomModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    backgroundColor: theme.colors.transparent,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 0,
    left: -20,
    zIndex: theme.zIndices['5'],
  },
  bubbleSelect: {
    backgroundColor: theme.colors.black,
  },
  arrow: {
    position: 'absolute',
    top: 20,
    left: 25,
    zIndex: theme.zIndices['5'],
  },
}))
