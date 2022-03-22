import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { dataToBeDisplayed, ValidationOfDataToBeDisplayed } from 'screens/dashboard/helpers/helper'
import { MateHolidaysData } from 'types/holidaysDataTypes'

type CarouselProps = {
  openUserModal: F1<MateHolidaysData>
}

export const Carousel = ({ openUserModal }: CarouselProps) => {
  const companyHolidaysData: ValidationOfDataToBeDisplayed[] = dataToBeDisplayed()

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
          <TouchableOpacity key={item.id} activeOpacity={1} onPress={() => openUserModal(userItem)}>
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
