import { useUserRequests } from 'hooks/useUserRequests'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'

import { Box } from 'utils/theme'
import { Request } from './components/Request'
import { SectionHeader } from './components/SectionHeader'

export const Requests = () => {
  const { requests } = useUserRequests()
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
        data={requests}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={1}>
            <Request item={item} />
          </TouchableOpacity>
        )}
      />
    </Box>
  )
}
