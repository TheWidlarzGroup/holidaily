import { CustomInput } from 'components/CustomInput'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { formatWithMask } from 'react-native-mask-input'
import { Box, mkUseStyles, theme } from 'utils/theme'
import CalendarIcon from 'assets/icons/icon-calendar.svg'

const daysInMonth = (year: number, month: number) => {
  const days = new Date(year, month, 0).getDate()

  const firstDayNumber = Number(String(days)[0])
  const secondDayNumber = Number(String(days)[1])

  return { firstDayNumber, secondDayNumber }
}

const mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]

interface Props {
  onIconPress: F0
  periodStart: string
  setPeriodStart: React.Dispatch<React.SetStateAction<string>>
  periodEnd: string
  setPeriodEnd: React.Dispatch<React.SetStateAction<string>>
}

const handleOnChangeSwitch = (e: string, setDate: any) => {
  const year = Number(e.slice(0, 4)) || 0
  const month = Number(e.slice(5, 7)) || 0

  const { firstDayNumber, secondDayNumber } = daysInMonth(year, month)

  switch (e.length) {
    case 1:
      if (Number(e) !== 2) {
        setDate('2')
      } else {
        setDate(e)
      }
      break
    case 2:
      if (Number(e) !== 0) {
        setDate(`${e.slice(0, 1)}0`)
      } else {
        setDate(e)
      }
      break
    case 5:
      if (Number(e.slice(4)) > 1) {
        setDate(`${e.slice(0, 4)}1`)
      } else {
        setDate(e)
      }
      break

    case 7:
      if (Number(e.slice(6)) > 2) {
        setDate(`${e.slice(0, 6)}2`)
      } else {
        setDate(e)
      }
      break

    case 8:
      if (Number(e.slice(7)) > firstDayNumber) {
        setDate(`${e.slice(0, 7)}${firstDayNumber}`)
      } else {
        setDate(e)
      }
      break

    case 10:
      if (Number(e.slice(9)) > secondDayNumber) {
        setDate(`${e.slice(0, 9)}${secondDayNumber}`)
      } else {
        setDate(e)
      }
      break

    default:
      setDate(e)
  }
}

export const DateInputs = (p: Props) => {
  const styles = useStyles()

  const { masked: maskedStart } = formatWithMask({
    text: p.periodStart,
    mask,
  })

  const { masked: maskedEnd } = formatWithMask({
    text: p.periodEnd,
    mask,
  })

  const handleOnChange = (e: string, type: 'from' | 'to') => {
    if (type === 'from') handleOnChangeSwitch(e, p.setPeriodStart)

    handleOnChangeSwitch(e, p.setPeriodEnd)
  }

  return (
    <Box flexDirection="row" paddingHorizontal="m" marginTop="xmm">
      <Box flex={1}>
        <CustomInput
          variant="medium"
          maxLength={10}
          value={maskedStart}
          onChangeText={(e) => handleOnChange(e, 'from')}
          inputLabel="Date From"
          blurOnSubmit
          placeholder="yyyy-mm-dd"
          keyboardType="number-pad"
          isError={false}
        />
      </Box>
      <Box flex={1} marginLeft="xmm">
        <CustomInput
          variant="medium"
          maxLength={10}
          value={maskedEnd}
          onChangeText={(e) => handleOnChange(e, 'to')}
          inputLabel="Date To"
          blurOnSubmit
          placeholder="yyyy-mm-dd"
          keyboardType="number-pad"
          isError={false}
        />
      </Box>

      <TouchableOpacity onPress={p.onIconPress} style={styles.calendarButton}>
        <CalendarIcon color={theme.colors.headerGrey} />
      </TouchableOpacity>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  calendarButton: {
    height: 40,
    width: 40,
    borderRadius: theme.borderRadii.l1min,
    backgroundColor: theme.colors.disabled,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.ml,
    marginLeft: theme.spacing.xmm,
  },
}))