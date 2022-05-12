import React from 'react'
import { Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back2.svg'
import { MateHeader } from 'screens/dashboard/components/MateHeader'
import { MateHoliday } from 'screens/dashboard/components/MateHoliday'
import { MateHolidayDetail } from 'screens/dashboard/components/MateHolidayDetail'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { User } from 'mock-api/models/mirageTypes'
import { isIos } from 'utils/layout'

type MemberProps = { user: User; closeModal: F0 }

export const DashboardTeamMember = ({ user, closeModal }: MemberProps) => (
  <SafeAreaWrapper isDefaultBgColor>
    <Box
      padding="m"
      paddingTop="xl"
      borderTopLeftRadius="m"
      borderTopRightRadius="m"
      backgroundColor="white"
      flexGrow={1}
      marginTop={isIos ? '-l' : 'none'}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          onPress={closeModal}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}>
          <IconBack height={18} width={18} color="black" />
        </TouchableOpacity>
        <MateHeader user={user} />
        <MateHoliday user={user} />
        <Box flexDirection="row">
          <MateHolidayDetail type="start" date={user?.requests[0].startDate || ''} />
          <MateHolidayDetail type="end" date={user?.requests[0].endDate || ''} />
        </Box>
      </ScrollView>
    </Box>
  </SafeAreaWrapper>
)
