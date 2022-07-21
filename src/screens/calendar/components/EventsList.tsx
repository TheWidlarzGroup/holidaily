import React, { useEffect, useState, forwardRef, useCallback } from 'react'
import { DayInfo, DAY_ITEM_HEIGHT } from 'screens/calendar/components/DayInfo'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity } from 'react-native'
import { Box, Text, useTheme } from 'utils/theme'
import { useLanguage } from 'hooks/useLanguage'
import { Analytics } from 'services/analytics'
import { LoadingModal } from 'components/LoadingModal'
import { sleep } from 'utils/sleep'
import { getISODateString } from 'utils/dates'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { TFunction, useTranslation } from 'react-i18next'
import { EVENT_HEIGHT } from './DayEvent'
import { DayInfoProps } from '../../../types/DayInfoProps'
import { GoUpDownButton } from './GoUpDownButton'

export type EventsListProps = {
  btnOnPress: F0
  selectedDate: Date
  days: DayInfoProps[]
  switchCalendarHeight: boolean
  setSwitchCalendarHeight: F1<boolean>
}

export const Item = React.memo(({ item }: { item: DayInfoProps }) => (
  <TouchableOpacity activeOpacity={1}>
    <DayInfo date={item.date} events={item.events} weekend={item.weekend} />
  </TouchableOpacity>
))

const ListFooterComponent = (t: TFunction<'calendar'>) => (
  <Box marginTop="s" alignItems="center">
    <Text variant="textXSGrey">{t('endOfEventsList')}</Text>
  </Box>
)

export const EventsList = forwardRef<FlatList, EventsListProps>(
  (
    { days, switchCalendarHeight, setSwitchCalendarHeight, btnOnPress, selectedDate },
    flatListRef
  ) => {
    const [pickedDate, setPickedDate] = useState(new Date())
    const [showLoadingModal, setShowLoadingModal] = useState(true)
    const { userSettings } = useUserSettingsContext()
    const [showNavButton, setShowNavButton] = useState(false)
    const [pageOffsetY, setPageOffsetY] = useState(0)
    const [language] = useLanguage()
    const theme = useTheme()

    const { t } = useTranslation('calendar')

    const { offset } = getItemLayout(days, 0)

    const renderItem = useCallback(({ item }) => <Item key={item.date} item={item} />, [])

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

    useEffect(() => {
      const condition = days.length > 0
      const cachedDate = userSettings?.pickedDate
      if (cachedDate && selectedDate) {
        const cachedDateToString = getISODateString(cachedDate)
        const selectedDateToString = getISODateString(selectedDate)
        if (cachedDateToString === selectedDateToString && condition) setShowLoadingModal(false)
      }
      if (!cachedDate && condition) setShowLoadingModal(false)
      // Comment: we don't want to track userSettings and selectedDate
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days])

    return (
      <Box marginTop="xxs" marginHorizontal="s" justifyContent="center" flex={1}>
        <FlatList
          ListFooterComponent={ListFooterComponent(t)}
          data={days}
          renderItem={renderItem}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={300}
          windowSize={17}
          extraData={[days, language]}
          keyExtractor={(item) => item.date}
          initialScrollIndex={selectedDate.getDate() - 1}
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
