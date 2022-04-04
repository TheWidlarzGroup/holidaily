import { useNavigation } from '@react-navigation/native'
import { useUserContext } from 'hooks/useUserContext'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionList, TouchableOpacity } from 'react-native'
import { Box, Text } from 'utils/theme'
import { Request } from './components/Request'
import { SectionHeader } from './components/SectionHeader'

export const Requests = () => {
  const { t } = useTranslation('stats')
  const navigation = useNavigation()
  const { user } = useUserContext()
  const requests = useMemo(() => user?.requests ?? [], [user])
  const { pendingRequests, approvedRequests, pastRequests, rejectedRequests } = useMemo(
    () => ({
      pendingRequests: requests.filter((req) => req.status === 'pending'),
      approvedRequests: requests.filter((req) => req.status === 'accepted'),
      pastRequests: requests.filter((req) => req.status === 'past'),
      rejectedRequests: requests.filter((req) => req.status === 'cancelled'),
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
            data: rejectedRequests,
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
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('SeeRequest', { ...item })}>
            <Request {...item} />
          </TouchableOpacity>
        )}
      />
    </Box>
  )
}
