import React from 'react'
import { Box } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackArrowIcon from 'assets/icons/icon-arrow-back-big.svg'
import AboutIcon from 'assets/icons/icon-info2.svg'

export const WelcomeTopBar = () => {
  const { navigate } = useNavigation()

  return (
    <Box justifyContent="space-between" alignItems="center" flexDirection="row" paddingTop="m">
      <Box>
        <TouchableOpacity
          onPress={() => navigate('Slider')}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <BackArrowIcon />
        </TouchableOpacity>
      </Box>
      <Box>
        <TouchableOpacity
          onPress={() => navigate('About', { isFromWelcomeScreen: true })}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <AboutIcon height={22} width={22} />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
