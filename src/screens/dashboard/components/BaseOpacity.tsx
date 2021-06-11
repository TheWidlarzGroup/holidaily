import React, { FC } from 'react'
import { Box } from 'utils/theme'
import { RequiredUserDetails } from 'types/holidaysDataTypes'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DashboardNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'

type BaseOpacityProps = {
  mate: RequiredUserDetails
  borderColor: string
}

export const BaseOpacity: FC<BaseOpacityProps> = ({ children, borderColor, mate }) => {
  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToMateDetails = (mate: RequiredUserDetails) =>
    navigation.navigate('DashboardTeamMember', { ...mate })

  return (
    <Box
      backgroundColor="disabledText"
      borderRadius="lmin"
      marginVertical="s"
      borderColor={borderColor}
      borderWidth={2}>
      <TouchableOpacity onPress={() => navigateToMateDetails(mate)}>
        <Box flexDirection="row" alignItems="center">
          {children}
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
