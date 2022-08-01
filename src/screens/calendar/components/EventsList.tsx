import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { DayInfo } from 'screens/calendar/components/DayInfo'
import { TouchableOpacity } from 'react-native'
import { Box, Text, useTheme } from 'utils/theme'
import { useLanguage } from 'hooks/useLanguage'
import { LoadingModal } from 'components/LoadingModal'
import { getISODateString } from 'utils/dates'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { TFunction, useTranslation } from 'react-i18next'
import { DayInfoProps } from 'types/DayInfoProps'
import { FlashList } from '@shopify/flash-list'

export type EventsListProps = {
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

export const EventsList = forwardRef<FlashList<DayInfoProps>, EventsListProps>(
  ({ days, switchCalendarHeight, setSwitchCalendarHeight, selectedDate }, flatListRef) => {
    const [pickedDate, setPickedDate] = useState(new Date())
    const [showLoadingModal, setShowLoadingModal] = useState(true)
    const { userSettings } = useUserSettingsContext()
    const [showNavButton, setShowNavButton] = useState(false)
    const [language] = useLanguage()
    const theme = useTheme()

    const { t } = useTranslation('calendar')

    const renderItem = useCallback(({ item }) => <Item key={item.date} item={item} />, [])

    const handleTouch = () => {
      if (switchCalendarHeight) setSwitchCalendarHeight(false)
    }

    const handleScroll = () => {
      handleTouch()
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
        <FlashList
          ListFooterComponent={ListFooterComponent(t)}
          estimatedItemSize={56}
          data={days}
          renderItem={renderItem}
          extraData={[days, language]}
          keyExtractor={(item) => item.date}
          initialScrollIndex={selectedDate.getDate() - 1}
          ref={flatListRef}
          onTouchEnd={handleTouch}
          onMomentumScrollEnd={handleScroll}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
        <LoadingModal
          show={showLoadingModal}
          style={{ backgroundColor: theme.colors.whiteDarken }}
        />
      </Box>
    )
  }
)
EventsList.displayName = 'EventsList'
