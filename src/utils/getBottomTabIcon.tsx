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
    case 'CALENDAR_NAVIGATION': {
      return (
        <CalendarIcon color={routeName === 'CALENDAR_NAVIGATION' ? fillActive : fillInactive} />
      )
    }
    case 'Stats': {
      return <StatsIcon color={routeName === 'Stats' ? fillActive : fillInactive} />
    }
    case 'FEED': {
      return <PasteIcon color={routeName === 'FEED' ? fillActive : fillInactive} />
    }
    default:
      break
  }
}
