import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import { DashboardNavigationProps } from 'navigation/types'
import { useRoute } from '@react-navigation/native'

export const DashboardTeam: FC = () => {
  const { params } = useRoute<DashboardNavigationProps<'DashboardTeam'>>()

  return (
    <Box>
      <Text variant="boldBlack18" paddingLeft="xm">
        {params.groupName}
      </Text>
    </Box>
  )
}
