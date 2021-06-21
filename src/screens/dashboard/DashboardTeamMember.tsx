import React, { FC } from 'react'
import { Box } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back.svg'
import { MateHeader } from 'screens/dashboard/components/MateHeader'
import { MateHoliday } from 'screens/dashboard/components/MateHoliday'
import { MateHolidayDetail } from 'screens/dashboard/components/MateHolidayDetail'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

type DashboardTeamMemberProps = DashboardNavigationProps<'DashboardTeamMember'>

export const DashboardTeamMember: FC<DashboardTeamMemberProps> = ({ route }) => {
  const { params } = route
  const { goBack } = useNavigation()

  return (
    <SafeAreaWrapper isDefaultBgColor>
      <Box
        marginTop="m"
        padding="m"
        backgroundColor="white"
        flexGrow={1}
        borderTopLeftRadius="l"
        borderTopRightRadius="l">
        <ScrollView showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={goBack}>
            <IconBack />
          </TouchableOpacity>
          <MateHeader {...params} />
          <MateHoliday {...params.holidays} />
          <Box flexDirection="row">
            <MateHolidayDetail type="start" date={params.holidays.dayStart} />
            <MateHolidayDetail type="end" date={params.holidays.dayEnd} />
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaWrapper>
  )
}
