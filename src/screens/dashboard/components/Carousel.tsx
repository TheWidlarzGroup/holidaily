import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { dataToBeDisplayed, ValidationOfDataToBeDisplayed } from 'screens/dashboard/helpers/helper'

export const Carousel = () => {
  const { i18n } = useTranslation('dashboard')
  const companyHolidaysData: ValidationOfDataToBeDisplayed[] = dataToBeDisplayed(i18n.language)

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
