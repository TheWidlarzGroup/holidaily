import { useUserRequests } from 'hooks/useUserRequests'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionList, TouchableOpacity } from 'react-native'
import { Box, Text } from 'utils/theme'
import { Request } from './components/Request'
import { SectionHeader } from './components/SectionHeader'

export const Requests = () => {
  const { requests } = useUserRequests()
  const { t } = useTranslation('stats')

  const { pendingRequests, approvedRequests, pastRequests, declinedRequests } = useMemo(
    () => ({
      pendingRequests: requests.filter((req) => req.status === 'PENDING'),
      approvedRequests: requests.filter((req) => req.status === 'APPROVED'),
      pastRequests: requests.filter((req) => req.status === 'PAST'),
      declinedRequests: requests.filter((req) => req.status === 'CANCELLED'),
    }),
    [requests]
  )

  return (
    <Box marginTop="xxl" flex={1}>
      <SectionHeader text={t('requests')} />
      <SectionList
        sections={[
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
          {
            title: t('declinedRequestsHeader'),
            data: declinedRequests,
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
