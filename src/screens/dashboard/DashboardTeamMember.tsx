import React from 'react'
import { Box, Text } from 'utils/theme'
import { MateHeader } from 'screens/dashboard/components/MateHeader'
import { MateHoliday } from 'screens/dashboard/components/MateHoliday'
import { MateHolidayDetail } from 'screens/dashboard/components/MateHolidayDetail'
import { User } from 'mock-api/models/mirageTypes'
import { sortSingleUserRequests } from 'utils/sortByDate'
import { useTranslation } from 'react-i18next'
import { ToggleButton } from 'components/ToggleButton'

type MemberProps = { user: User }

export const DashboardTeamMember = ({ user }: MemberProps) => {
  const { t } = useTranslation('dashboard')
  let sortedRequests = user.requests.slice().sort(sortSingleUserRequests)
  sortedRequests = sortedRequests.filter((req) => req.status !== 'past')
  return (
    <>
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
    </>
  )
}
