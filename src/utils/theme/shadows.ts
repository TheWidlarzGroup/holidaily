import { theme } from 'utils/theme'

export const shadow = {
  default: {
    shadowOffset: { width: 0, height: 1 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.01,
    shadowRadius: 3,
    elevation: 10,
  },
  xs: {
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 10,
  },
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.01,
    shadowRadius: 5,
    elevation: 15,
  },
  lg: {
    shadowOffset: { width: 0, height: 10 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.01,
    shadowRadius: 15,
    elevation: 20,
  },
  xl: {
    shadowOffset: { width: 0, height: 20 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.01,
    shadowRadius: 25,
    elevation: 25,
  },
  xxl: {
    shadowOffset: { width: 0, height: 25 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 25,
  },
}
