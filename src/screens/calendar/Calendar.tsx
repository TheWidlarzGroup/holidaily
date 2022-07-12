import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { FlatList } from 'react-native'
import { ExpandableCalendar } from 'components/ExpandableCalendar'
import { parseISO } from 'utils/dates'
import { RequestsContextProvider } from 'contexts/RequestsProvider'
import { useBooleanState } from 'hooks/useBooleanState'
import { LoadingModal } from 'components/LoadingModal'
import { CategoriesSlider } from './components/CategoriesSlider'
import { FormInput } from 'components/FormInput'
import { t } from 'i18next'
import { CustomInput } from 'components/CustomInput'

const daysInMonth = (year: number, month: number) => {
  const days = new Date(year, month, 0).getDate()

  const firstDayNumber = Number(String(days)[0])
  const secondDayNumber = Number(String(days)[1])

  return { firstDayNumber, secondDayNumber }
}

const CalendarToWrap = () => {
  const flatListRef = useRef<FlatList>(null)
  const {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  } = useCalendarData()

  const [selectedTo, setSelectedTo] = useState('')

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

  const markedDates = useMemo(() => getMarkedDates(currentMonthDays), [currentMonthDays])

  if (isLoading) return <LoadingModal show />

  const handleOnChange = (e: string) => {
    const year = Number(e.slice(0, 4)) || 0
    const month = Number(e.slice(5, 7)) || 0

    const { firstDayNumber, secondDayNumber } = daysInMonth(year, month)
    switch (e.length) {
      case 1:
        if (Number(e) !== 2) {
          setSelectedTo('2')
        } else {
          setSelectedTo(e)
        }
        break
      case 2:
        if (Number(e) !== 0) {
          setSelectedTo(`${e.slice(0, 1)}0`)
        } else {
          setSelectedTo(e)
        }
        break
      case 5:
        if (Number(e.slice(4)) <= 1) {
          setSelectedTo(`${e.slice(0, 4)}-${e.slice(4)}`)
        } else {
          setSelectedTo(`${e.slice(0, 4)}-1`)
        }
        break

      case 7:
        console.log('here')
        if (Number(e.slice(6)) > 2) {
          setSelectedTo(`${e.slice(0, 6)}2-`)
        } else {
          setSelectedTo(`${e.slice(0, 7)}-`)
        }
        break
      case 9:
        if (Number(e.slice(8)) > firstDayNumber) {
          console.log('here')
          setSelectedTo(`${e.slice(0, 8)}${firstDayNumber}`)
        } else {
          setSelectedTo(e)
        }
        break

      case 10:
        if (Number(e.slice(9)) > secondDayNumber) {
          setSelectedTo(`${e.slice(0, 9)}${secondDayNumber}`)
        } else {
          setSelectedTo(e)
        }
        break
      default:
        setSelectedTo(e)
    }
  }

  // const convertDate = () => {
  //   return selectedTo.length > 1 ? selectedTo.slice(0, 2) + '-' : selectedTo
  // }

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <CategoriesSlider
        filterCategories={filterCategories || []}
        toggleFilterItemSelection={toggleFilterItemSelection}
      />
      <Box>
        <CustomInput
          variant="medium"
          maxLength={10}
          value={selectedTo}
          onChangeText={handleOnChange}
          // control={control}
          // isError={!!errors.firstName}
          // errors={errors}
          // name="firstName"
          inputLabel={t('yourName')}
          // validationPattern={onlyLettersRegex}
          // errorMessage={t('firstNameErrMsg', { max: MAX_SIGNS })}
          blurOnSubmit
          placeholder="dd-mm-yyyy"
          keyboardType="number-pad"
          isError={false}
        />
        <CustomInput
          variant="medium"
          maxLength={20}
          isError={false}
          onChangeText={(e) => console.log('e', e)}
          // control={control}
          // isError={!!errors.firstName}
          // errors={errors}
          // name="firstName"
          inputLabel={t('yourName')}
          // validationPattern={onlyLettersRegex}
          // errorMessage={t('firstNameErrMsg', { max: MAX_SIGNS })}
          blurOnSubmit
          placeholder="dd-mm-yyyy"
          keyboardType="number-pad"
        />
      </Box>
      <Box
        borderRadius="lmin"
        backgroundColor="white"
        marginTop="m"
        marginHorizontal="xm"
        shadowOffset={{ width: 0, height: 2 }}
        shadowColor="black"
        shadowOpacity={0.15}
        shadowRadius={6}
        elevation={4}>
        {false && (
          <ExpandableCalendar
            markedDates={markedDates}
            markingType="multi-dot"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onDayPress={handleDayPress}
          />
        )}
      </Box>
      <EventsList days={currentMonthDays} ref={flatListRef} />
    </SafeAreaWrapper>
  )
}

export const Calendar = () => (
  <RequestsContextProvider>
    <CalendarToWrap />
  </RequestsContextProvider>
)
