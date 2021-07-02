import { CalendarIcon } from 'assets/icons/CalendarIcon'
import { HomeIcon } from 'assets/icons/HomeIcon'
import { StatsIcon } from 'assets/icons/StatsIcon'
import { PasteIcon } from 'assets/icons/PasteIcon'
import React from 'react'

export const getBottomTabIcon = (
  tab: string,
  routeName: string,
  fillActive: string,
  fillInactive: string
) => {
  switch (tab) {
    case 'DashboardNavigation': {
      return <HomeIcon fill={routeName === 'DashboardNavigation' ? fillActive : fillInactive} />
    }
    case 'Calendar': {
      return <CalendarIcon fill={routeName === 'Calendar' ? fillActive : fillInactive} />
    }
    case 'Stats': {
      return <StatsIcon fill={routeName === 'Stats' ? fillActive : fillInactive} />
    }
    case 'Feed': {
      return <PasteIcon fill={routeName === 'Feed' ? fillActive : fillInactive} />
    }
    default:
      break
  }
}
