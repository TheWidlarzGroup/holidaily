import { User } from 'mock-api/models/mirageTypes'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { dataToBeDisplayed, ValidationOfDataToBeDisplayed } from 'screens/dashboard/helpers/helper'

type CarouselProps = {
  openUserModal: F1<User>
}

export const Carousel = ({ openUserModal }: CarouselProps) => {
  const companyHolidaysData: ValidationOfDataToBeDisplayed[] = dataToBeDisplayed()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {companyHolidaysData.map((item) => {
        const { endDate, startDate, id, isOnHoliday, user } = item
        const { firstName, lastName, occupation, photo } = user
        const userItem = {
          firstName,
          lastName,
          occupation,
          photo,
          id: id.toString(),
          requests: { id, endDate, startDate, isOnHoliday },
        }

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={1}
            onPress={() =>
              console.log('please implement openUserModal(userItem) in Carousel component')
            }>
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
