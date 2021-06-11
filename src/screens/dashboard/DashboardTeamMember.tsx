import React from 'react'
import { Box, Text } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { useRoute } from '@react-navigation/native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

export const DashboardTeamMember = () => {
  const { params } = useRoute<DashboardNavigationProps<'DashboardTeamMember'>>()

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
