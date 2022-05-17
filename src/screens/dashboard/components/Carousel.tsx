import { SwipeableModal } from 'components/SwipeableModal'
import format from 'date-fns/format'
import { useTeamsContext } from 'hooks/useTeamsContext'
import { User } from 'mock-api/models/mirageTypes'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { getClosestHolidayRequests } from 'utils/closestHolidayRequests'
import { getCurrentLocale } from 'utils/locale'
import { Text } from 'utils/theme'
import { DashboardTeamMember } from '../DashboardTeamMember'

export const Carousel = () => {
  const { teams } = useTeamsContext()
  const { t } = useTranslation('dashboard')

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalUser, setModalUser] = useState<User>()
  const openModal = (user: User) => {
    setModalUser(user)
    setIsModalVisible(true)
  }
  const displayDay = (user: User) => {
    const { endDate, startDate } = user.requests[0]
    const dateFormat = 'dd MMMM'
    const formatDayoffDate = (dateString: string) =>
      format(new Date(dateString), dateFormat, { locale: getCurrentLocale() })
    return user.isOnHoliday ? formatDayoffDate(startDate) : formatDayoffDate(endDate)
  }
  const first20Users = useMemo(() => getClosestHolidayRequests(teams).slice(0, 20), [teams])
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
      <FlatList
        data={first20Users}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={useCallback(
          ({ item: user }) => (
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
          ),
          []
        )}
      />
      {modalUser && (
        <SwipeableModal isOpen={isModalVisible} onHide={() => setIsModalVisible(false)}>
          <DashboardTeamMember closeModal={() => setIsModalVisible(false)} user={modalUser} />
        </SwipeableModal>
      )}
    </>
  )
}
