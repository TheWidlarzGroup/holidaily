import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box, mkUseStyles, Text } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { FlatList } from 'react-native'
import { getFormattedPeriod, parseISO, getDurationInDays, calculatePTO } from 'utils/dates'
import { RequestsContextProvider } from 'contexts/RequestsProvider'
import { useBooleanState } from 'hooks/useBooleanState'
import { LoadingModal } from 'components/LoadingModal'
import { SwipeableModalRegular } from 'components/SwipeableModalRegular'
import { CalendarList } from 'components/CalendarList'
import { CustomButton } from 'components/CustomButton'
import { useTranslation } from 'react-i18next'
import { DateInputs } from './components/DateInputs'
import { CategoriesSlider } from './components/CategoriesSlider'

const getActionModalHeaderText = (
  periodStart: string,
  periodEnd: string,
  t: any,
  language: string
) => {
  if (!periodStart && !periodEnd) return ''

  const withOneBeforeText = language === 'en' ? '' : 1

  if (periodStart === periodEnd)
    return `${withOneBeforeText} ${getDurationInDays(1)} ${t('outOfOfficeSingular')}`

  return `${getDurationInDays(calculatePTO(periodStart, periodEnd))} ${t('outOfOffice')}`
}

const CalendarToWrap = () => {
  const flatListRef = useRef<FlatList>(null)
  const {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
    requestsDays,
  } = useCalendarData()

  const styles = useStyles()

  const { i18n, t } = useTranslation('calendar')

  const [periodStart, setPeriodStart] = useState('')
  const [periodEnd, setPeriodEnd] = useState('')

  const [isCalendarOpened, { setFalse: hideCalendar, setTrue: openCalendar }] =
    useBooleanState(false)

  const handleDayPress = useCallback(
    ({ dateString }: { dateString: string }) => {
      const dayEvents = currentMonthDays.find((a) => a.date === dateString)
      if (!dayEvents) return
      const index = currentMonthDays.indexOf(dayEvents)
      flatListRef.current?.scrollToIndex({ index, animated: true })
      setTimeout(() => setSelectedDate(parseISO(dateString)))
    },
    [currentMonthDays, setSelectedDate]
  )

  // Comment: show loader spinner while calendar is rendering
  const [isLoading, { setFalse: hideLoader }] = useBooleanState(true)

  useEffect(() => {
    hideLoader()
  }, [hideLoader])

  const markedDates = useMemo(() => getMarkedDates(requestsDays), [requestsDays])

  // const handleOpenCalendar = () => {
  //    setCalendarOpened
  // }

  const onModalBtnPress = () => {
    hideCalendar()
  }

  if (isLoading) return <LoadingModal show />

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <CategoriesSlider
        filterCategories={filterCategories || []}
        toggleFilterItemSelection={toggleFilterItemSelection}
      />

      <DateInputs
        onIconPress={openCalendar}
        periodStart={periodStart}
        periodEnd={periodEnd}
        setPeriodStart={setPeriodStart}
        setPeriodEnd={setPeriodEnd}
      />

      <SwipeableModalRegular
        isOpen={isCalendarOpened}
        onHide={hideCalendar}
        hasIndicator
        closeIcon="back">
        <Box position="relative">
          <CalendarList
            periodStart={periodStart}
            periodEnd={periodEnd}
            selectPeriodStart={setPeriodStart}
            selectPeriodEnd={setPeriodEnd}
            selectable
            disablePastDates
            style={styles.calendar}
            markedDates={markedDates}
            markingType="multi-dot"
            // isInvalid={isInvalid}
          />
          <Box
            shadowOffset={{ width: -2, height: 0 }}
            shadowColor="black"
            shadowOpacity={0.04}
            shadowRadius={2}
            elevation={20}
            alignItems="center"
            paddingVertical="l"
            backgroundColor="alwaysWhite"
            zIndex="2"
            // height={200}
            position="absolute"
            bottom={100}
            width="100%">
            <Text variant="displayBoldSM">{getFormattedPeriod(periodStart, periodEnd)}</Text>
            <Text variant="textSM">
              {getActionModalHeaderText(periodStart, periodEnd, t, i18n.language)}
            </Text>
            <Box marginTop="m">
              <CustomButton
                label={t('select')}
                variant="primary"
                onPress={onModalBtnPress}
                disabled={!periodStart}
              />
            </Box>
          </Box>
          {/* <ActionModal
            isVisible
            onUserAction={onModalBtnPress}
            label={t('select')}
            variant="regular"
            isButtonDisabled={!periodStart}
            header="random Text"
            content="random content"
            // content={actionModalTexts.content}
          /> */}
        </Box>
      </SwipeableModalRegular>
      <EventsList days={currentMonthDays} ref={flatListRef} />
    </SafeAreaWrapper>
  )
}

export const Calendar = () => (
  <RequestsContextProvider>
    <CalendarToWrap />
  </RequestsContextProvider>
)

const useStyles = mkUseStyles((theme) => ({
  calendar: {
    width: 400,
    marginTop: theme.spacing.s,
  },
}))
