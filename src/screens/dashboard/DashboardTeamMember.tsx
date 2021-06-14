import React, { FC } from 'react'
import { Box } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back.svg'
import { MateHeader } from 'screens/dashboard/components/MateHeader'
import { MateHoliday } from 'screens/dashboard/components/MateHoliday'
import { MateHolidayDetail } from 'screens/dashboard/components/MateHolidayDetail'
import { TouchableOpacity } from 'react-native'
import { DashboardNavigationType } from 'navigation/types'
import { useNavigation } from '@react-navigation/native'

type DashboardTeamMemberProps = DashboardNavigationProps<'DashboardTeamMember'>

export const DashboardTeamMember: FC<DashboardTeamMemberProps> = ({ route }) => {
  const { params } = route
  const navigation = useNavigation<DashboardNavigationType<'DashboardTeamMember'>>()

  return (
    <SafeAreaWrapper isDefaultBgColor>
      <Box
        padding="m"
        backgroundColor="white"
        height="100%"
        borderTopLeftRadius="l"
        borderTopRightRadius="l">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconBack />
        </TouchableOpacity>
        <MateHeader {...params} />
        <MateHoliday {...params.holidays} />
        <Box flexDirection="row">
          <MateHolidayDetail {...params.holidays} />
          <MateHolidayDetail {...params.holidays} />
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}
