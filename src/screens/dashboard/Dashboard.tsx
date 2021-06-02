import React, { FC } from 'react'
import { Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'

export const Dashboard: FC = () => (
  <SafeAreaWrapper isDefaultBgColor>
    <Box>
      <DashboardHeader />
    </Box>
  </SafeAreaWrapper>
)
