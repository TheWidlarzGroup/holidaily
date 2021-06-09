import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { dataToBeDisplayed, ValidationOfDataToBeDisplayed } from '../helper'

export const DashboardCarousel: FC = () => {
  const { i18n } = useTranslation()
  const companyHolidaysData: ValidationOfDataToBeDisplayed[] = dataToBeDisplayed(i18n.language)

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {companyHolidaysData.map((item) => (
        <CarouselElement
          key={item.id}
          isOnHoliday={item.isOnHoliday}
          firstName={item.user.firstName}
          lastName={item.user.lastName}
          dayToBeDisplayed={item.dayToBeDisplayed}
        />
      ))}
    </ScrollView>
  )
}
