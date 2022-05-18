import React from 'react'
import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back2.svg'
import { MateHeader } from 'screens/dashboard/components/MateHeader'
import { MateHoliday } from 'screens/dashboard/components/MateHoliday'
import { MateHolidayDetail } from 'screens/dashboard/components/MateHolidayDetail'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { User } from 'mock-api/models/mirageTypes'
import { sortSingleUserRequests } from 'utils/sortByDate'
import { useTranslation } from 'react-i18next'
import { ToggleButton } from 'components/ToggleButton'
import { ModalHandleIndicator } from 'components/ModalHandleIndicator'

type MemberProps = { user: User; closeModal: F0 }

export const DashboardTeamMember = ({ user, closeModal }: MemberProps) => {
  const { t } = useTranslation('dashboard')
  let sortedRequests = user.requests.slice().sort(sortSingleUserRequests)
  sortedRequests = sortedRequests.filter((req) => req.status !== 'past')

  return (
    <SafeAreaWrapper isDefaultBgColor>
      <Box
        padding="m"
        paddingTop="xl"
        borderTopLeftRadius="m"
        borderTopRightRadius="m"
        backgroundColor="white"
        flexGrow={1}
        marginTop="-l"
        position="relative">
        <ScrollView showsHorizontalScrollIndicator={false}>
          <ModalHandleIndicator />
          <Box position="absolute">
            <TouchableOpacity
              onPress={closeModal}
              hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}>
              <IconBack height={18} width={18} color="black" />
            </TouchableOpacity>
          </Box>
          <MateHeader user={user} />
          {!!sortedRequests[0] && (
            <>
              <MateHoliday user={user} sortedRequests={sortedRequests} />
              <Box flexDirection="row">
                <MateHolidayDetail type="start" date={sortedRequests[0].startDate || ''} />
                <MateHolidayDetail type="end" date={sortedRequests[0].endDate || ''} />
              </Box>
            </>
          )}
          {!!sortedRequests[1] && (
            <>
              <MateHoliday user={user} sortedRequests={sortedRequests} isNextRequest />
            </>
          )}
          {user.teams.length > 0 ? (
            <>
              <Text
                variant="displayXS"
                color="darkGrey"
                letterSpacing={0.7}
                paddingTop="m"
                marginBottom="s">
                {t('teams').toUpperCase()}
              </Text>
              <Box flexDirection="row" flexWrap="wrap">
                {user.teams.map((team) => (
                  <ToggleButton key={team.name}>{team.name}</ToggleButton>
                ))}
              </Box>
            </>
          ) : null}
        </ScrollView>
      </Box>
    </SafeAreaWrapper>
  )
}
