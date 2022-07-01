import React, { useEffect, useState, forwardRef } from 'react'
import { DayInfo, DAY_ITEM_HEIGHT } from 'screens/calendar/components/DayInfo'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity } from 'react-native'
import { Box, useTheme } from 'utils/theme'
import { useLanguage } from 'hooks/useLanguage'
import { Analytics } from 'services/analytics'
import { LoadingModal } from 'components/LoadingModal'
import { sleep } from 'utils/sleep'
import { useAsyncEffect } from 'hooks/useAsyncEffect'
import { getItem } from 'utils/localStorage'
import { getISODateString } from 'utils/dates'
import { EVENT_HEIGHT } from './DayEvent'
import { DayInfoProps } from '../../../types/DayInfoProps'
import { GoUpDownButton } from './GoUpDownButton'

export type EventsListProps = {
  btnOnPress: F0
  selectedDate: Date
  currentIndex: number
  days: DayInfoProps[]
  switchCalendarHeight: boolean
  setSwitchCalendarHeight: F1<boolean>
}

const renderItem = ({ item }: { item: DayInfoProps }) => (
  <TouchableOpacity activeOpacity={1} key={item.date}>
    <DayInfo date={item.date} events={item.events} weekend={item.weekend} />
  </TouchableOpacity>
)

export const EventsList = forwardRef<FlatList, EventsListProps>(
  (
    { days, switchCalendarHeight, setSwitchCalendarHeight, btnOnPress, currentIndex, selectedDate },
    flatListRef
  ) => {
    const [pickedDate, setPickedDate] = useState(new Date())
    const [showLoadingModal, setShowLoadingModal] = useState(true)
    const [showNavButton, setShowNavButton] = useState(false)
    const [pageOffsetY, setPageOffsetY] = useState(0)
    const [language] = useLanguage()
    const theme = useTheme()

    const { offset } = getItemLayout(days, currentIndex)

    const handleTouch = () => {
      if (switchCalendarHeight) setSwitchCalendarHeight(false)
    }

    const handleScroll = () => {
      handleTouch()
      if (Math.abs(pageOffsetY - offset) > 300) setShowNavButton(true)
      else setShowNavButton(false)
    }

    const measureScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { y } = e.nativeEvent.contentOffset
      setPageOffsetY(y)
    }

    const arrowDirection = pageOffsetY > offset ? 'up' : 'down'
    const handleBtn = async () => {
      if (switchCalendarHeight) {
        setSwitchCalendarHeight(false)
        setTimeout(() => {
          btnOnPress()
        }, 1000)
      } else {
        btnOnPress()
      }
      Analytics().track('CALENDAR_SCROLL_TO_BUTTON_PRESSED')
      await sleep(500)
      setShowNavButton(false)
    }

    useEffect(() => {
      if (selectedDate !== pickedDate) setPickedDate(selectedDate)
      if (showNavButton) setShowNavButton(false)
      // Comment: we don't want to track picked date and showNavButton
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate])

    useAsyncEffect(async () => {
      const condition = days.length > 0 && currentIndex >= 0
      const pickedDate = await getItem('pickedCalendarDate')
      if (pickedDate) {
        const cachedDate = Date.parse(pickedDate)
        const selectedDateToString = getISODateString(selectedDate)
        const selectedDateToNumber = Date.parse(selectedDateToString)
        if (cachedDate === selectedDateToNumber && condition) setShowLoadingModal(false)
      }
      if (!pickedDate && condition) setShowLoadingModal(false)
    }, [days, currentIndex])

    return (
      <Box marginTop="xxs" marginHorizontal="s" justifyContent="center" flex={1}>
        <FlatList
          data={days}
          renderItem={renderItem}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={300}
          windowSize={17}
          extraData={[days, language]}
          keyExtractor={(item) => item.date}
          initialScrollIndex={new Date().getDate() - 1}
          getItemLayout={getItemLayout}
          ref={flatListRef}
          onTouchEnd={handleTouch}
          onMomentumScrollEnd={handleScroll}
          onScroll={(e) => measureScroll(e)}
          onScrollToIndexFailed={() => console.error('EventList scrollTo failed')}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
        {showNavButton && <GoUpDownButton onPress={handleBtn} arrowDirection={arrowDirection} />}
        <LoadingModal
          show={showLoadingModal}
          style={{ backgroundColor: theme.colors.whiteDarken }}
        />
      </Box>
    )
  }
)
EventsList.displayName = 'EventsList'

// Comment: Entirely removing getItemLayout cause the EventList scrollTo to fail for some time after initial render, because the flatlist is performing measurment by itself.
export const getItemLayout = (data: DayInfoProps[] | null | undefined, index: number) => {
  if (!data)
    return {
      length: DAY_ITEM_HEIGHT,
      offset: DAY_ITEM_HEIGHT * index,
      index,
    }
  let prevEventsCount = 0
  for (let i = 0; i < index; i++) {
    prevEventsCount += data[i].events?.length ?? 0
  }
  return {
    length: DAY_ITEM_HEIGHT,
    offset: index * DAY_ITEM_HEIGHT + prevEventsCount * EVENT_HEIGHT,
    index,
  }
}
