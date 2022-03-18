import StatsIcon from 'assets/icons/icon-stats.svg'
import PasteIcon from 'assets/icons/icon-feed.svg'
import React from 'react'
import HomeIcon from 'assets/icons/icon-home.svg'
import CalendarIcon from 'assets/icons/icon-calendar.svg'

export const getBottomTabIcon = (
  tab: string,
  routeName: string,
  fillActive: string,
  fillInactive: string
) => {
  switch (tab) {
    case 'DashboardNavigation': {
      return <HomeIcon color={routeName === 'DashboardNavigation' ? fillActive : fillInactive} />
    }
    case 'Calendar': {
      return <CalendarIcon color={routeName === 'Calendar' ? fillActive : fillInactive} />
    }
    case 'Stats': {
      return <StatsIcon color={routeName === 'Stats' ? fillActive : fillInactive} />
    }
    case 'Feed': {
      return <PasteIcon color={routeName === 'Feed' ? fillActive : fillInactive} />
    }
    default:
      break
  }
}
