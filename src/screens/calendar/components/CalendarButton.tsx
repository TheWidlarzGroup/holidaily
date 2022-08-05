import React from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import { mkUseStyles } from 'utils/theme'

type Props = {
  children: React.ReactNode
  onIconPress: F0
  type?: 'gray' | 'blue'
  disabled?: boolean
}

const emptyFn = () => {}

export const CalendarButton = (props: Props) => {
  const styles = useStyles()

  return (
    <BorderlessButton
      activeOpacity={props.disabled ? 1 : 0}
      onPress={props.disabled ? emptyFn : props.onIconPress}
      style={[
        styles.calendarButton,
        props?.type === 'blue' ? styles.calendarButtonBlue : null,
        props.disabled && styles.disabled,
      ]}>
      {props.children}
    </BorderlessButton>
  )
}

const useStyles = mkUseStyles((theme) => ({
  calendarButtonBlue: {
    backgroundColor: theme.colors.specialDarker,
  },
  calendarButton: {
    height: 40,
    width: 40,
    borderRadius: theme.borderRadii.l1min,
    backgroundColor: theme.colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.xmm,
  },
  disabled: {
    backgroundColor: theme.colors.disabledButtonBg,
  },
}))
