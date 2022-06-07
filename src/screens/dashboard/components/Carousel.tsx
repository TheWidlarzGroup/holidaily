import format from 'date-fns/format'
import { User } from 'mock-api/models/mirageTypes'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { getCurrentLocale } from 'utils/locale'
import { Text } from 'utils/theme'
import { useSortAllHolidayRequests } from 'utils/useSortAllHolidayRequests'
import { Analytics } from 'services/analytics'
import { TeamMemberModal } from '../DashboardTeam'

export const Carousel = () => {
  const { t } = useTranslation('dashboard')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalUser, setModalUser] = useState<User>()
  const openModal = (user: User) => {
    setModalUser(user)
    Analytics().track('DASHBOARD_CAROUSEL_OPENED', {
      profileName: `${user.firstName} ${user.lastName}`,
    })
    setIsModalVisible(true)
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
      {sortedRequests.length > 0 && (
        <FlatList
          data={first20Users}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: user }) => (
            <TouchableOpacity key={user.id} activeOpacity={1} onPress={() => openModal(user)}>
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
          )}
        />
      )}
      {modalUser && (
        <TeamMemberModal
          isOpen={isModalVisible}
          onHide={() => setIsModalVisible(false)}
          modalUser={modalUser}
        />
      )}
    </>
  )
}
