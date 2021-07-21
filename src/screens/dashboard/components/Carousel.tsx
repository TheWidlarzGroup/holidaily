import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { dataToBeDisplayed, ValidationOfDataToBeDisplayed } from 'screens/dashboard/helpers/helper'

export const Carousel = () => {
  const companyHolidaysData: ValidationOfDataToBeDisplayed[] = dataToBeDisplayed()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {companyHolidaysData.map((item) => (
        <TouchableOpacity key={item.id} activeOpacity={1}>
          <CarouselElement
            isOnHoliday={item.isOnHoliday}
            firstName={item.user.firstName}
            lastName={item.user.lastName}
            photo={item.user.photo}
            dayToBeDisplayed={item.dayToBeDisplayed}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}
