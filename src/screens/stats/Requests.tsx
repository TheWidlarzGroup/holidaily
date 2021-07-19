import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'

import { Box, Text } from 'utils/theme'
import { Request } from './components/Request'
import { SectionHeader } from './components/SectionHeader'
import { MOCKED_REQUESTS } from './MockedData'

export const Requests = () => {
  const handleSearch = () => {
    console.log('handleSearch')
  }
  const handleFilter = () => {
    console.log('handleFilter')
  }
  return (
    <Box marginTop="xxl" flex={1}>
      <SectionHeader text="Requests" onSearch={handleSearch} onFilter={handleFilter} />
      <FlatList
        data={MOCKED_REQUESTS}
        keyExtractor={({ key }) => key.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={1}>
            <Request
              title={item.title}
              startDate={item.startDate}
              endDate={item.endDate}
              status={item.status}
            />
          </TouchableOpacity>
        )}
      />
      {/* <Request title="Day off" date="2 April 2021" duration="1 day" status="Now" />
      <Request
        title="Hiking the Tatras"
        date="22 - 26 April 2021"
        duration="4 days"
        status="Approved"
      />
      <Request
        title="Hiking the Tatras"
        date="22 - 26 April 2021"
        duration="4 days"
        status="Pending"
      />
      <Request
        title="Hiking the Tatras"
        date="22 - 26 April 2021"
        duration="4 days"
        status="Past"
      /> */}
      {/* <Box
        marginHorizontal="s"
        marginTop="l"
        backgroundColor="white"
        borderRadius="lmin"
        padding="m"
        flexDirection="row"
        justifyContent="space-between">
        <Box>
          <Text variant="bold16" marginBottom="s">
            Day off
          </Text>
          <Text variant="captionText">2 April 2021</Text>
          <Text variant="captionText">1 day</Text>
        </Box>
        <Box alignItems="flex-end">
          <Text variant="bold16" marginBottom="s">
            Day off
          </Text>
          <Text variant="captionText">2 April 2021</Text>
          <Text variant="captionText">1 day</Text>
        </Box>
      </Box> */}
    </Box>
  )
}
