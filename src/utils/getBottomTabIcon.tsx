import { CalendarIcon } from 'assets/icons/CalendarIcon'
import { HomeIcon } from 'assets/icons/HomeIcon'
import { MessageIcon } from 'assets/icons/MessageIcon'
import { PasteIcon } from 'assets/icons/PasteIcon'
import React from 'react'

export const getBottomTabIcon = (
  tab: string,
  routeName: string,
  fillActive: string,
  fillInactive: string
) => {
  switch (tab) {
    case 'Dashboard': {
      return <HomeIcon fill={routeName === 'Dashboard' ? fillActive : fillInactive} />
    }
    case 'Calendar': {
      return <CalendarIcon fill={routeName === 'Calendar' ? fillActive : fillInactive} />
    }
    case 'Panel': {
      return <PasteIcon fill={routeName === 'Panel' ? fillActive : fillInactive} />
    }
    case 'Chat': {
      return <MessageIcon fill={routeName === 'Chat' ? fillActive : fillInactive} />
    }
    default:
      break
  }
}
