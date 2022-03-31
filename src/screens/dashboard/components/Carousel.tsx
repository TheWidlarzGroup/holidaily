import format from 'date-fns/format'
import { User } from 'mock-api/models/mirageTypes'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { getClosestHolidayRequests } from 'utils/closestHolidayRequests'
import { useGetOrganization } from '../../../data-access/queries/useOrganizationQuery'

type CarouselProps = {
  openUserModal: F1<User>
}

export const Carousel = ({ openUserModal }: CarouselProps) => {
  const { data } = useGetOrganization()

  if (!data) return null

  const usersWithHoliday = getClosestHolidayRequests(data.teams)

  const displayDay = (user: User) => {
    if (user.requests[0].isOnHoliday) {
      return format(new Date(user.requests[0].endDate), 'dd MMMM')
    }
    if (!user.requests[0].isOnHoliday) {
      return format(new Date(user.requests[0].startDate), 'dd MMMM ')
    }
    return ''
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {usersWithHoliday.slice(0, 12).map((user) => (
        <TouchableOpacity key={user.id} activeOpacity={1} onPress={() => openUserModal(user)}>
          <CarouselElement
            isOnHoliday={user.requests[0].isOnHoliday}
            firstName={user.firstName}
            lastName={user.lastName}
            photo={user.photo}
            dayToBeDisplayed={displayDay(user)}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}
