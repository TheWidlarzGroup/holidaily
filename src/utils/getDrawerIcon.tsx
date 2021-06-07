import React from 'react'
import BudgetIcon from 'assets/icons/icon-budget.svg'
import SettingsIcon from 'assets/icons/icon-settings.svg'
import EditIcon from 'assets/icons/icon-edit.svg'
import AboutIcon from 'assets/icons/icon-info.svg'
import LogoutIcon from 'assets/icons/icon-log-out.svg'

const props = {
  width: 40,
  height: 40,
}

export const getDrawerIcon = (tab: string) => {
  switch (tab) {
    case 'Edit profile': {
      return <EditIcon {...props} />
    }
    case 'Settings': {
      return <SettingsIcon {...props} />
    }
    case 'Budget': {
      return <BudgetIcon {...props} />
    }
    case 'About': {
      return <AboutIcon {...props} />
    }
    case 'Logout': {
      return <LogoutIcon {...props} />
    }
    default:
      break
  }
}
