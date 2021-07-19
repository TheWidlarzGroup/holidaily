import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'

import { Box } from 'utils/theme'
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
            <Request item={item} />
          </TouchableOpacity>
        )}
      />
    </Box>
  )
}
