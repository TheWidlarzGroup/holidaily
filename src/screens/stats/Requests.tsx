import { useNavigation } from '@react-navigation/native'
import { useUserContext } from 'hooks/useUserContext'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionList, TouchableOpacity } from 'react-native'
import { isDateBetween } from 'utils/dates'
import { Box, Text } from 'utils/theme'
import { Request } from './components/Request'
import { SectionHeader } from './components/SectionHeader'

export const Requests = () => {
  const { t } = useTranslation('stats')
  const { navigate } = useNavigation()
  const { user } = useUserContext()
  const requests = useMemo(() => user?.requests ?? [], [user])
  const { ongoingRequests, pendingRequests, approvedRequests, pastRequests, declinedRequests } =
    useMemo(
      () => ({
        ongoingRequests: requests.filter(
          (req) =>
            req.status === 'accepted' && isDateBetween(new Date(), req.startDate, req.endDate)
        ),
        pendingRequests: requests.filter((req) => req.status === 'pending'),
        approvedRequests: requests.filter(
          (req) =>
            req.status === 'accepted' && !isDateBetween(new Date(), req.startDate, req.endDate)
        ),
        pastRequests: requests.filter((req) => req.status === 'past'),
        declinedRequests: requests.filter((req) => req.status === 'cancelled'),
      }),
      [requests]
    )

  return (
    <Box marginTop="xxl" flex={1}>
      <SectionHeader text={t('requests')} />
      <SectionList
        sections={[
          {
            title: t('ongoingRequestsHeader'),
            data: ongoingRequests,
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
        ListFooterComponent={<Box height={100} />}
        renderItem={useCallback(
          ({ item }) => (
            <TouchableOpacity activeOpacity={1} onPress={() => navigate('SeeRequest', item)}>
              <Request {...item} />
            </TouchableOpacity>
          ),
          [navigate]
        )}
      />
    </Box>
  )
}
