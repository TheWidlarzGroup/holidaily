import { useUserRequests } from 'hooks/useUserRequests'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SectionList, TouchableOpacity } from 'react-native'

import { Box, Text } from 'utils/theme'
import { Request } from './components/Request'
import { SectionHeader } from './components/SectionHeader'

export const Requests = () => {
  const { requests } = useUserRequests()
  const { t } = useTranslation('score')
  const handleSearch = () => {
    console.log('handleSearch')
  }
  const handleFilter = () => {
    console.log('handleFilter')
  }

  const pendingRequests = requests.filter((req) => req.status === 'PENDING')
  const approvedRequests = requests.filter((req) => req.status === 'APPROVED')
  const pastRequests = requests.filter((req) => req.status === 'PAST')
  const currentRequests = requests.filter((req) => req.status === 'NOW')

  return (
    <Box marginTop="xxl" flex={1}>
      <SectionHeader text="Requests" onSearch={handleSearch} onFilter={handleFilter} />
      <SectionList
        sections={[
          {
            title: 'NOW',
            data: currentRequests,
          },
          {
            title: t('pendingRequestsHeader'),
            data: pendingRequests,
          },
          {
            title: t('acceptedRequestsHeader'),
            data: approvedRequests,
          },
          {
            title: t('pastRequestsHeader'),
            data: pastRequests,
          },
        ]}
        keyExtractor={({ id }) => id}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length ? (
            <Text variant="lightGreyRegular" margin="xm">
              {title}
            </Text>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={1}>
            <Request item={item} />
          </TouchableOpacity>
        )}
      />
    </Box>
  )
}
