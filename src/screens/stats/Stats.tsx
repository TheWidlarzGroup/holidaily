import React from 'react'

import { Box, Text } from 'utils/theme'
import Character from 'assets/Character.svg'
import { SectionHeader } from './components/SectionHeader'
import { MOCKED_STATS } from './MockedData'

export const Stats = () => {
  const handleMore = () => {
    console.log('more')
  }
  return (
    <Box>
      <SectionHeader text="Your score" onMore={handleMore} />
      <Box
        marginLeft="s"
        marginTop="l"
        backgroundColor="white"
        borderTopLeftRadius="lmin"
        borderBottomLeftRadius="lmin"
        padding="m"
        flexDirection="row"
        position="relative">
        <Box flex={1 / 2}>
          <Box flexDirection="row" alignItems="center">
            <Text variant="boldOrange20" marginRight="s">
              {MOCKED_STATS.ptoLeft}
            </Text>
            <Text variant="body1">days of PTO</Text>
          </Box>
          <Box height={1} backgroundColor="black" marginVertical="m" />
          <Box flexDirection="row" alignItems="center">
            <Text variant="bold15" marginRight="s">
              {MOCKED_STATS.ptoUsed}
            </Text>
            <Text variant="captionText">days of PTO used</Text>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <Text variant="bold15" marginRight="s">
              {MOCKED_STATS.sickDaysUsed}
            </Text>
            <Text variant="captionText">sick days taken</Text>
          </Box>
        </Box>
        <Box position="absolute" right={0} top="-35%">
          <Character />
        </Box>
      </Box>
    </Box>
  )
}
