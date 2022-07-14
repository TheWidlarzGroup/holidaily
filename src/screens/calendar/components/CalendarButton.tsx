import React from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import { mkUseStyles } from 'utils/theme'

interface Props {
  children: React.ReactNode
  onIconPress: F0
  type?: 'gray' | 'blue'
}

export const CalendarButton = (props: Props) => {
  const styles = useStyles()

  return (
    <BorderlessButton
      onPress={props.onIconPress}
      style={[styles.calendarButton, props?.type === 'blue' ? styles.calendarButtonBlue : null]}>
      {props.children}
    </BorderlessButton>
  )
}

const useStyles = mkUseStyles((theme) => ({
  calendarButtonBlue: {
    backgroundColor: theme.colors.special,
  },
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
