import React, { FC } from 'react'
import { Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DashboardHeader } from 'screens/dashboard/components/DashboardHeader'
import { DashboardCarousel } from './components/DashboardCarousel'

export const Dashboard: FC = () => (
  <SafeAreaWrapper isDefaultBgColor>
    <Box>
      <DashboardHeader />
      <DashboardCarousel />
    </Box>
  </SafeAreaWrapper>
)
