import React, { useMemo } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useFetchUserStats } from 'dataAccess/queries/useFetchUserStats'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useTranslation } from 'react-i18next'
import { SectionList, TouchableOpacity } from 'react-native'
import { isDateBetween } from 'utils/dates'
import { DayOffRequest } from 'mockApi/models'
import { Box, Text } from 'utils/theme'
import { RequestsNavigatorType } from 'navigation/types'
import { GestureRecognizer } from 'utils/GestureRecognizer'
import { Stats } from './Stats'
import { Request } from './components/Request'

type NavigationType = RequestsNavigatorType<'STATS_AND_REQUESTS'> & typeof DrawerActions

export const StatsAndRequests = () => {
  const { data: stats } = useFetchUserStats()
  const { t } = useTranslation('stats')
  const { user } = useUserContext()
  const navigation = useNavigation<NavigationType>()

  const requests = useMemo(
    () =>
      user?.requests.slice().sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)) ??
      [],
    [user]
  )

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

  const handleSwipeRight = () => {
    navigation.openDrawer()
  }

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['bottom']}>
      <GestureRecognizer onSwipeRight={handleSwipeRight} iosOnly>
        <SectionList
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={<Stats stats={stats} />}
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
              <Text
                marginBottom="s"
                marginLeft="m"
                marginTop="l"
                variant="inputLabel"
                lineHeight={18}
                color="darkGreyBrighter">
                {title}
              </Text>
            ) : null
          }
          ListFooterComponent={<Box height={100} />}
          renderItem={Item}
        />
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}

const Item = ({ item }: { item: DayOffRequest }) => {
  const { navigate } = useNavigation<RequestsNavigatorType<'SEE_REQUEST'>>()
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigate('SEE_REQUEST', { ...item, prevScreen: 'STATS_AND_REQUESTS' })}>
      <Request {...item} />
    </TouchableOpacity>
  )
}
