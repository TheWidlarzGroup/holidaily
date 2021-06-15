import React, { FC } from 'react'

import { Calendar as CalendarComponent } from 'components/Calendar'
import { Box } from 'utils/theme'

const jake = { key: 'jake', color: '#FF88DC' }
const monica = { key: 'monica', color: '#91A6FF' }
const bart = { key: 'bart', color: '#80ED99' }
const matthew = { key: 'matthew', color: '#80ED99' }

export const Calendar: FC = () => (
  <Box>
    <CalendarComponent
      markedDates={{
        '2021-06-15': { dots: [jake, monica, bart, matthew] },
        '2021-06-16': { dots: [jake, monica, bart] },
        '2021-06-17': { dots: [jake, monica] },
        '2021-06-18': { dots: [jake, monica] },
      }}
      markingType="multi-dot"
    />
  </Box>
)
