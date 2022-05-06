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
    if (user.isOnHoliday) {
      return format(new Date(user.requests[0].endDate), 'dd MMMM')
    }
    if (!user.isOnHoliday) {
      return format(new Date(user.requests[0].startDate), 'dd MMMM')
    }
    return ''
  }
  console.log('carousel')
  const first20Users = useMemo(() => getClosestHolidayRequests(teams).slice(0, 20), [teams])
  return (
    <>
      <Text
        variant="displayXS"
        color="darkGrey"
        paddingHorizontal="xm"
        letterSpacing={0.7}
        paddingTop="m">
        {t('bookedHolidays')}
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
