import React from 'react'
import BudgetIcon from 'assets/icons/icon-budget.svg'
import SettingsIcon from 'assets/icons/icon-settings.svg'
import EditIcon from 'assets/icons/icon-edit.svg'
import AboutIcon from 'assets/icons/icon-info.svg'
import LogoutIcon from 'assets/icons/icon-log-out.svg'
import EmployeesIcon from 'assets/icons/icon-employees.svg'
import { useTheme } from './theme'

export type Tab =
  | 'ProfileNavigation'
  | 'Settings'
  | 'HolidayBudget'
  | 'About'
  | 'Logout'
  | 'AdminPanelEmployeesNavigation'

const dimensions = {
  width: 40,
  height: 40,
}
const smallDimensions = {
  width: 20,
  height: 20,
  marginHorizontal: 10,
}

export const DrawerIcon = (tab: Tab) => {
  const theme = useTheme()
  switch (tab) {
    case 'ProfileNavigation': {
      return <EditIcon {...dimensions} color={theme.colors.black} />
    }
    case 'Settings': {
      return <SettingsIcon {...dimensions} />
    }
    case 'HolidayBudget': {
      return <BudgetIcon {...dimensions} />
    }
    case 'About': {
      return <AboutIcon {...dimensions} color={theme.colors.black} />
    }
    case 'Logout': {
      return <LogoutIcon {...dimensions} />
    }
    case 'AdminPanelEmployeesNavigation': {
      return <EmployeesIcon {...smallDimensions} />
    }
    default:
      break
  }
}
