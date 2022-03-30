import format from 'date-fns/format'
import { Team, User } from 'mock-api/models/mirageTypes'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { useGetOrganization } from '../../../data-access/queries/useOrganizationQuery'

type CarouselProps = {
  openUserModal: F1<User>
}

export const Carousel = ({ openUserModal }: CarouselProps) => {
  const { data } = useGetOrganization()

  let allSortedUsers: User[] = []

  const getClosestHolidayRequests = (teams: Team[]) => {
    teams.forEach((team) => allSortedUsers.push(...team.users))
    allSortedUsers = allSortedUsers.filter(
      (user, index, arr) =>
        arr.findIndex((usr) => usr.id === user.id && usr.id === user.id) === index
    )
    allSortedUsers = allSortedUsers.filter((user) => user.requests.length > 0)

    const sortByDate = (a: User, b: User) => {
      if (a.requests[0].startDate < b.requests[0].startDate) return -1
      if (a.requests[0].startDate > b.requests[0].startDate) return 1
      return 0
    }
    allSortedUsers.sort(sortByDate)
  }

  if (!data) return null

  if (data.teams) {
    getClosestHolidayRequests(data.teams)
  }

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
      {allSortedUsers.map((user) => (
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
