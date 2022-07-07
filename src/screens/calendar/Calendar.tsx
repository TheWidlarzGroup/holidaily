import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { FlatList } from 'react-native'
import { ExpandableCalendar } from 'components/ExpandableCalendar'
import { parseISO } from 'utils/dates'
import { RouteProp, useRoute } from '@react-navigation/native'
import { BottomTabRoutes } from 'navigation/types'
import { PrevScreen, usePrevScreenBackHandler } from 'hooks/usePrevScreenBackHandler'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { CategoriesSlider } from './components/CategoriesSlider'

export const Calendar = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)
  const route = useRoute<RouteProp<BottomTabRoutes, 'CALENDAR'>>()
  const [switchCalendarHeight, setSwitchCalendarHeight] = useState(true)
  const prevScreen: PrevScreen = route.params?.prevScreen
  const { userSettings } = useUserSettingsContext()

  const { selectedDate, setSelectedDate, currentMonthDays } = useCalendarData()

  usePrevScreenBackHandler(prevScreen)

  const handleDayPress = useCallback(
    ({ dateString }: { dateString: string }) => {
      const dayEvents = currentMonthDays.find((a) => a.date === dateString)
      if (!dayEvents) return

      const index = currentMonthDays.indexOf(dayEvents)
      const validatedIndex = index >= 31 ? 0 : index
      setCurrentIndex(validatedIndex)

      flatListRef.current?.scrollToIndex({ index: validatedIndex, animated: true })
      setSelectedDate(parseISO(dateString))
    },
    [currentMonthDays, setSelectedDate]
  )

  const scrollToIndex = useCallback(
    (index: number) => flatListRef.current?.scrollToIndex({ index, animated: true }),
    []
  )

  useEffect(() => {
    const pickedDate = userSettings?.pickedDate
    if (pickedDate !== selectedDate && pickedDate) setSelectedDate(pickedDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const markedDates = useMemo(() => getMarkedDates(currentMonthDays), [currentMonthDays])

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <CategoriesSlider />
      <Box
        borderRadius="xm"
        backgroundColor="white"
        marginTop="m"
        paddingHorizontal="ms"
        shadowOffset={{ width: 0, height: 2 }}
        shadowColor="blackMuchDarker"
        shadowOpacity={0.5}
        shadowRadius={4}
        elevation={4}>
        <ExpandableCalendar
          markedDates={markedDates}
          markingType="multi-dot"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setCurrentIndex={setCurrentIndex}
          scrollToIndex={scrollToIndex}
          onDayPress={handleDayPress}
          isFullHeight={switchCalendarHeight}
          setIsFullHeight={setSwitchCalendarHeight}
        />
      </Box>
      <EventsList
        ref={flatListRef}
        selectedDate={selectedDate}
        days={currentMonthDays}
        currentIndex={currentIndex}
        switchCalendarHeight={switchCalendarHeight}
        setSwitchCalendarHeight={setSwitchCalendarHeight}
        btnOnPress={() =>
          flatListRef.current?.scrollToIndex({ index: currentIndex, animated: true })
        }
      />
    </SafeAreaWrapper>
  )
}
