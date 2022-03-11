import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { dataToBeDisplayed, ValidationOfDataToBeDisplayed } from 'screens/dashboard/helpers/helper'
import { useNavigation } from '@react-navigation/native'

export const Carousel = () => {
  const companyHolidaysData: ValidationOfDataToBeDisplayed[] = dataToBeDisplayed()
  const { navigate } = useNavigation()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {companyHolidaysData.map((item) => {
        const { dayEnd, dayStart, id, isOnHoliday, user } = item
        const { firstName, lastName, occupation, photo } = user
        const userItem = {
          firstName,
          lastName,
          occupation,
          photo,
          id: id.toString(),
          holidays: { id, dayEnd, dayStart, isOnHoliday },
        }

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={1}
            onPress={() => navigate('DashboardTeamMember', { ...userItem })}>
            <CarouselElement
              isOnHoliday={item.isOnHoliday}
              firstName={item.user.firstName}
              lastName={item.user.lastName}
              photo={item.user.photo}
              dayToBeDisplayed={item.dayToBeDisplayed}
            />
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}
