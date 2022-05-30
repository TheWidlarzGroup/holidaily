import { useMemo } from 'react'
import { mkUseStyles } from 'utils/theme'

export const useCalendarPeriodStyles = () => {
  const commonStyles = useCommonPeriodStyles()
  const validStyles = useValidPeriodStyles()
  const invalidStyles = useInvalidPeriodStyles()
  const validPeriodStyles = useMemo(
    () => ({ ...commonStyles, ...validStyles }),
    [commonStyles, validStyles]
  )
  const invalidPeriodStyles = useMemo(
    () => ({ ...commonStyles, ...invalidStyles }),
    [commonStyles, invalidStyles]
  )
  return { validPeriodStyles, invalidPeriodStyles }
}

const useValidPeriodStyles = mkUseStyles((theme) => ({
  disabledDay: {
    backgroundColor: '#ffc59e',
  },
  dayInPeriod: {
    backgroundColor: theme.colors.tertiary,
  },
}))

const useInvalidPeriodStyles = mkUseStyles((theme) => ({
  disabledDay: {
    backgroundColor: theme.colors.specialRed,
  },
  dayInPeriod: {
    backgroundColor: theme.colors.errorRed,
  },
}))

const useCommonPeriodStyles = mkUseStyles((theme) => ({
  selectedDay: {
    borderRadius: theme.borderRadii.full,
  },

  periodEndDay: {
    borderBottomRightRadius: theme.borderRadii.full,
    borderTopRightRadius: theme.borderRadii.full,
  },
  periodStartDay: {
    borderBottomLeftRadius: theme.borderRadii.full,
    borderTopLeftRadius: theme.borderRadii.full,
  },
}))
