import React from 'react'
import { Box } from 'utils/theme'
import { MateHeader } from 'screens/dashboard/components/MateHeader'
import { MateHoliday } from 'screens/dashboard/components/MateHoliday'
import { MateHolidayDetail } from 'screens/dashboard/components/MateHolidayDetail'
import { User } from 'mock-api/models/mirageTypes'

type MemberProps = { user: User }

export const DashboardTeamMember = ({ user }: MemberProps) => (
  <>
    <MateHeader user={user} />
    {!!user?.requests[0] && (
      <>
        <MateHoliday user={user} />
        <Box flexDirection="row">
          <MateHolidayDetail type="start" date={user?.requests[0].startDate || ''} />
          <MateHolidayDetail type="end" date={user?.requests[0].endDate || ''} />
        </Box>
      </>
    )}
    {!!user?.requests[1] && (
      <>
        <MateHoliday user={user} isNextRequest />
      </>
    )}
    {/* TODO: Display teams that user belongs to */}
    {/* {user.teams.length > 0 &&
    user.teams.map((team) => {
      return (
        <Box>
          <Text variant='textSM'>{team}</Text>
        </Box>
      )
    })} */}
  </>
)
