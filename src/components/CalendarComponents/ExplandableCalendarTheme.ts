import { theme as appTheme } from 'utils/theme'

const theme = {
  calendarBackground: 'transparent',
}
export const headerTheme = {
  'stylesheet.calendar.header': {
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 6,
      alignItems: 'center',
      marginBottom: 10,
    },
    week: {
      marginTop: 7,
      paddingRight: 5,
      paddingLeft: 5,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    dayHeader: {
      width: 32,
      textAlign: 'center',
      marginBottom: 8,
      fontSize: 12,
      fontFamily: 'Nunito-Regular',
      color: appTheme.colors.grey,
    },
  },
  ...theme,
}
export const calendarTheme = {
  'stylesheet.calendar.header': {
    header: {
      display: 'none' as const,
    },
  },
  ...theme,
}
