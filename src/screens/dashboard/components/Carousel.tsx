import format from 'date-fns/format'
import { User } from 'mock-api/models/mirageTypes'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { getCurrentLocale } from 'utils/locale'
import { Text } from 'utils/theme'
import { Analytics } from 'services/analytics'
import { FlashList } from '@shopify/flash-list'
import { useTeamsContext } from 'hooks/context-hooks/useTeamsContext'
import { useSortAllHolidayRequests } from 'utils/useSortAllHolidayRequests'
import { TeamMemberModal } from '../DashboardTeam'

const CAROUSEL_ITEM_WIDTH = 94.2

type FlatListItem = {
  item: User
}

export const Carousel = () => {
  const { t } = useTranslation('dashboard')
  const { allUsers } = useTeamsContext()
  const [modalUser, setModalUser] = useState<User | null>(null)
  const openModal = (user: User) => {
    setModalUser(user)
    Analytics().track('DASHBOARD_CAROUSEL_OPENED', {
      profileName: `${user.firstName} ${user.lastName}`,
    })
  }
  const displayDay = (user: User) => {
    const { endDate, startDate } = user.requests[0]
    const dateFormat = 'dd MMM'
    const formatDayoffDate = (dateString: string) =>
      format(new Date(dateString), dateFormat, { locale: getCurrentLocale() })
    return user.isOnHoliday ? formatDayoffDate(endDate) : formatDayoffDate(startDate)
  }

  const { sortedRequests } = useSortAllHolidayRequests()
  const first20Users = useMemo(() => sortedRequests.slice(0, 20), [sortedRequests])

  const renderItem = ({ item: user }: FlatListItem) => (
    <TouchableOpacity activeOpacity={1} onPress={() => openModal(user)}>
      <CarouselElement
        isOnHoliday={user.isOnHoliday}
        firstName={user.firstName}
        lastName={user.lastName}
        photo={user.photo}
        userColor={user.userColor}
        dayToBeDisplayed={displayDay(user)}
        isSickTime={user.requests[0].isSickTime}
      />
    </TouchableOpacity>
  )

  const keyExtractor = (item: User) => item.id

  return (
    <>
      <Text
        variant="displayXS"
        color="darkGrey"
        paddingHorizontal="xm"
        letterSpacing={0.7}
        paddingTop="m">
        {t('bookedHolidays').toUpperCase()}
      </Text>
      {allUsers.length > 0 && (
        <FlashList
          data={first20Users}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          estimatedItemSize={CAROUSEL_ITEM_WIDTH}
          keyExtractor={keyExtractor}
        />
      )}
      {modalUser && (
        <TeamMemberModal
          isOpen={!!modalUser}
          onHide={() => setModalUser(null)}
          modalUser={modalUser}
        />
      )}
    </>
  )
}
