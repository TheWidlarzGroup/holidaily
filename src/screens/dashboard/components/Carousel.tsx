import React from 'react'
import { ScrollView } from 'react-native'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { dataToBeDisplayed, ValidationOfDataToBeDisplayed } from 'screens/dashboard/helpers/helper'

export const Carousel = () => {
  const companyHolidaysData: ValidationOfDataToBeDisplayed[] = dataToBeDisplayed()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {companyHolidaysData.map((item) => (
        <CarouselElement
          key={item.id}
          isOnHoliday={item.isOnHoliday}
          firstName={item.user.firstName}
          lastName={item.user.lastName}
          photo={item.user.photo}
          dayToBeDisplayed={item.dayToBeDisplayed}
        />
      ))}
    </ScrollView>
  )
}
