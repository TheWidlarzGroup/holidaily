import React from 'react'
import BudgetIcon from 'assets/icons/icon-budget.svg'
import SettingsIcon from 'assets/icons/icon-settings.svg'
import EditIcon from 'assets/icons/icon-edit.svg'
import AboutIcon from 'assets/icons/icon-info.svg'
import LogoutIcon from 'assets/icons/icon-log-out.svg'
import EmployeesIcon from 'assets/icons/icon-employees.svg'
import { useTheme } from './theme'
import { isSmallScreen } from './deviceSizes'

export type Tab =
  | 'ProfileNavigation'
  | 'Settings'
  | 'HolidayBudget'
  | 'About'
  | 'Logout'
  | 'AdminPanelEmployeesNavigation'

const regularDimensions = {
  width: 40,
  height: 40,
}

const mediumDimensions = {
  width: 28,
  height: 28,
}

const smallDimensions = {
  width: 20,
  height: 20,
  marginHorizontal: 10,
}

export const DrawerIcon = (tab: Tab) => {
  const theme = useTheme()
  const iconDimensions = isSmallScreen ? mediumDimensions : regularDimensions
  switch (tab) {
    case 'ProfileNavigation': {
      return <EditIcon {...iconDimensions} color={theme.colors.black} />
    }
    case 'Settings': {
      return <SettingsIcon {...iconDimensions} />
    }
    case 'HolidayBudget': {
      return <BudgetIcon {...iconDimensions} />
    }
    case 'About': {
      return <AboutIcon {...iconDimensions} color={theme.colors.black} />
    }
    case 'Logout': {
      return <LogoutIcon {...iconDimensions} />
    }
    case 'AdminPanelEmployeesNavigation': {
      return <EmployeesIcon {...smallDimensions} />
    }
    default:
      break
  }
}
