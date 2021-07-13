import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, StatusBar } from 'react-native'
import { Box, Text, mkUseStyles, Theme } from 'utils/theme'
import IconBack from 'assets/icons/icon-back-white.svg'
import { useModalContext } from 'contexts/ModalProvider'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { useNavigation } from '@react-navigation/native'
import { Bubble } from './Bubble'

type ColorProps = {
  id: number
  color: string
}
const COLORS: ColorProps[] = [
  {
    color: 'red',
    id: 1,
  },
  {
    color: 'blue',
    id: 2,
  },
  {
    color: 'purple',
    id: 3,
  },
  {
    color: 'orange',
    id: 4,
  },
]

export const BubbleContainer = () => {
  const styles = useStyles()
  const { showModal, hideModal } = useModalContext()
  const [isSelected, setIsSelected] = useState(false)
  const { goBack } = useNavigation()

  const diameter = 56

  const handleGoBack = () => {
    if (isSelected) {
      showModal(
        <ConfirmationModal
          isVisible
          hideModal={hideModal}
          onAccept={() => {
            hideModal()
            goBack()
          }}
          onDecline={hideModal}
          content={'Are you sure???'}
        />
      )
    } else {
      goBack()
    }
  }

  useEffect(() => {
    StatusBar.setBackgroundColor('transparent')
    return () => StatusBar.setBackgroundColor('white')
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'black', flexWrap: 'wrap' }}>
      <TouchableOpacity activeOpacity={0.2} onPress={handleGoBack} style={styles.backBtn}>
        <IconBack />
      </TouchableOpacity>
      <Box marginTop="xxxl" alignItems="center" width="100%">
        <Text variant="buttonText1">Pick your favourite color</Text>
      </Box>
      {COLORS.map(({ color, id }) => (
        <Box position="absolute" key={id}>
          <Bubble color={color} diameter={diameter} setIsSelected={setIsSelected} />
        </Box>
      ))}
    </View>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 65,
    zIndex: theme.zIndices['5'],
  },
}))
