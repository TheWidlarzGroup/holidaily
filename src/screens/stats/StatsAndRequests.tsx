import React from 'react'

import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Stats } from './Stats'
import { Requests } from './Requests'

export const StatsAndRequests = () => (
  <SafeAreaWrapper isDefaultBgColor isTabNavigation>
    <Stats />
    <Requests />
  </SafeAreaWrapper>
)
