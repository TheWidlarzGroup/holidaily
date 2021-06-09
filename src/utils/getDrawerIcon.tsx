import React from 'react'
import BudgetIcon from 'assets/icons/icon-budget.svg'
import SettingsIcon from 'assets/icons/icon-settings.svg'
import EditIcon from 'assets/icons/icon-edit.svg'
import AboutIcon from 'assets/icons/icon-info.svg'
import LogoutIcon from 'assets/icons/icon-log-out.svg'

const dimensions = {
  width: 40,
  height: 40,
}

export const getDrawerIcon = (tab: string) => {
  switch (tab) {
    case 'EditProfile': {
      return <EditIcon {...dimensions} />
    }
    case 'Settings': {
      return <SettingsIcon {...dimensions} />
    }
    case 'HolidayBudget': {
      return <BudgetIcon {...dimensions} />
    }
    case 'About': {
      return <AboutIcon {...dimensions} />
    }
    case 'Logout': {
      return <LogoutIcon {...dimensions} />
    }
    default:
      break
  }
}
