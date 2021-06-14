import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

type DashboardTeamMemberProps = DashboardNavigationProps<'DashboardTeamMember'>

export const DashboardTeamMember: FC<DashboardTeamMemberProps> = ({ route }) => {
  const { params } = route

  return (
    <SafeAreaWrapper>
      <Box>
        <Text variant="boldBlack18" paddingLeft="xm">
          Team member details {params.firstName}
        </Text>
      </Box>
    </SafeAreaWrapper>
  )
}
