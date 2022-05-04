import React from 'react'
import { Box } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackArrowIcon from 'assets/icons/icon-back2.svg'
import AboutIcon from 'assets/icons/icon-info2.svg'
import { isIos } from 'utils/layout'

export const WelcomeTopBar = ({ openModal }: { openModal: F0 }) => {
  const { navigate } = useNavigation()

  return (
    <Box
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
      paddingTop={isIos ? 'xxlplus' : 'xl'}>
      <Box>
        <TouchableOpacity
          onPress={() => navigate('Slider')}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <BackArrowIcon height={18} width={18} />
        </TouchableOpacity>
      </Box>
      <Box>
        <TouchableOpacity
          onPress={openModal}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <AboutIcon height={23} width={23} />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
