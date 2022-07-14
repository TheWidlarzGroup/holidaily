import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Box, mkUseStyles, Text, theme } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { FlatList } from 'react-native'
import { getFormattedPeriod, getDurationInDays, calculatePTO } from 'utils/dates'
import { RequestsContextProvider } from 'contexts/RequestsProvider'
import { useBooleanState } from 'hooks/useBooleanState'
import { LoadingModal } from 'components/LoadingModal'
import { SwipeableModalRegular } from 'components/SwipeableModalRegular'
import { CalendarList } from 'components/CalendarList'
import { CustomButton } from 'components/CustomButton'
import { useTranslation } from 'react-i18next'
import CloseIcon from 'assets/icons/icon-close.svg'
import AcceptIcon from 'assets/icons/icon-accept.svg'
import { DayInfoProps } from 'types/DayInfoProps'
import { DateInputs } from './components/DateInputs'
import { CategoriesSlider } from './components/CategoriesSlider'
import { CalendarButton } from './components/CalendarButton'

const getActionModalHeaderText = (
  periodStart: string,
  periodEnd: string,
  t: any,
  language: string
) => {
  if (periodStart?.length < 10 && periodEnd?.length < 10) return ''

  const withOneBeforeText = language === 'en' ? '' : 1

  if (periodStart === periodEnd)
    return `${withOneBeforeText} ${getDurationInDays(1)} ${t('outOfOfficeSingular')}`

  return `${getDurationInDays(calculatePTO(periodStart, periodEnd))} ${t('outOfOffice')}`
}

const getActionModalTitle = (periodStart: string, periodEnd: string) => {
  if (periodStart.length < 10 || periodEnd.length < 10) return ''

  return getFormattedPeriod(periodStart, periodEnd)
}

const CalendarToWrap = () => {
  const flatListRef = useRef<FlatList>(null)
  const { filterCategories, toggleFilterItemSelection, currentMonthDays, requestsDays } =
    useCalendarData()

  const styles = useStyles()

  const { i18n, t } = useTranslation('calendar')

  const [periodStart, setPeriodStart] = useState('')
  const [periodEnd, setPeriodEnd] = useState('')

  const [slicedRequests, setSlicedRequest] = useState<DayInfoProps[]>([])

  const [isCalendarOpened, { setFalse: hideCalendar, setTrue: openCalendar }] =
    useBooleanState(false)

  const handleSetEventsInPeriod = () => {
    const startDateItemIndex = requestsDays.findIndex((a) => a.date === periodStart)

    const endDateItemIndex = requestsDays.findIndex((a) => a.date === periodEnd)

    const sliced = requestsDays.slice(
      startDateItemIndex,
      endDateItemIndex + 1 || requestsDays?.length
    )

    setSlicedRequest(sliced)
  }

  // Comment: show loader spinner while calendar is rendering
  const [isLoading, { setFalse: hideLoader }] = useBooleanState(true)

  useEffect(() => {
    hideLoader()
  }, [hideLoader])

  const markedDates = useMemo(() => getMarkedDates(requestsDays), [requestsDays])

  const onModalBtnPress = () => {
    hideCalendar()
  }

  const clearDatesInputs = () => {
    setPeriodStart('')
    setPeriodEnd('')
    setSlicedRequest([])
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
      {periodStart?.length === 10 || periodEnd?.length === 10 ? (
        <Box flexDirection="row" justifyContent="flex-end" marginHorizontal="m">
          <CalendarButton onIconPress={clearDatesInputs}>
            <CloseIcon color={theme.colors.headerGrey} />
          </CalendarButton>
          <CalendarButton onIconPress={handleSetEventsInPeriod} type="blue">
            <AcceptIcon color={theme.colors.white} />
          </CalendarButton>
        </Box>
      ) : null}

      <SwipeableModalRegular
        isOpen={isCalendarOpened}
        onHide={hideCalendar}
        hasIndicator
        closeIcon="back">
        <Box position="relative">
          <CalendarList
            periodStart={periodStart}
            periodEnd={periodEnd || periodStart}
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
            position="absolute"
            /// TODO:  FIX Bottom value
            bottom={100}
            width="100%">
            <Text variant="displayBoldSM">{getActionModalTitle(periodStart, periodEnd)}</Text>
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
      <EventsList
        days={!slicedRequests?.length ? currentMonthDays : slicedRequests}
        ref={flatListRef}
      />
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
