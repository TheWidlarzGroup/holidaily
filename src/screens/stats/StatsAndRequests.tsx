import React, { useMemo } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useFetchUserStats } from 'dataAccess/queries/useFetchUserStats'
import { LoadingModal } from 'components/LoadingModal'
import { useNavigation } from '@react-navigation/native'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useTranslation } from 'react-i18next'
import { SectionList, TouchableOpacity } from 'react-native'
import { isDateBetween } from 'utils/dates'
import { DayOffRequest } from 'mockApi/models'
import { Box, Text } from 'utils/theme'
import { Stats } from './Stats'
import { Request } from './components/Request'
import { SectionHeader } from './components/SectionHeader'

export const StatsAndRequests = () => {
  const { isLoading, data: stats } = useFetchUserStats()
  const { t } = useTranslation('stats')
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

  if (isLoading || !stats) return <LoadingModal show />
  return (
    <SafeAreaWrapper isDefaultBgColor edges={['bottom']}>
      <SectionList
        ListHeaderComponent={
          <>
            <Stats stats={stats} />
            <Box paddingTop="xl">
              <SectionHeader text={t('requests')} />
            </Box>
          </>
        }
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
        renderItem={Item}
      />
    </SafeAreaWrapper>
  )
}

const Item = ({ item }: { item: DayOffRequest }) => {
  const { navigate } = useNavigation()
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigate('SEE_REQUEST', { ...item, prevScreen: 'STATS_AND_REQUESTS' })}>
      <Request {...item} />
    </TouchableOpacity>
  )
}
