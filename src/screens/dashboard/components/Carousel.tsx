import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { CarouselElement } from 'screens/dashboard/components/CarouselElement'
import { dataToBeDisplayed, ValidationOfDataToBeDisplayed } from 'screens/dashboard/helpers/helper'
import { useNavigation } from '@react-navigation/native'
import { DashboardNavigationType } from 'navigation/types'
import { RequiredMateHolidaysData } from 'types/holidaysDataTypes'

type MateElementProps = RequiredMateHolidaysData

export const Carousel = () => {
  const companyHolidaysData: ValidationOfDataToBeDisplayed[] = dataToBeDisplayed()

  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToMateDetails = (props: MateElementProps) =>
    navigation.navigate('DashboardTeamMember', { ...props })

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {companyHolidaysData.map((item) => {
        const { dayEnd, dayStart, id, isOnHoliday, user } = item
        const userItem = {
          ...user,
          id: id.toString(),
          holidays: { id, dayEnd, dayStart, isOnHoliday },
        }

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={1}
            onPress={() => navigateToMateDetails(userItem)}>
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
