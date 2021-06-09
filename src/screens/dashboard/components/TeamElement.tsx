import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import { ValidationOfGroupDayOff } from 'screens/dashboard/helpers/temporaryData'
import { qtyOnHolidayNow } from 'utils/functions'
import IconPalm from 'assets/icons/icon-palm.svg'
import IconProfile from 'assets/icons/icon-profile.svg'

export const TeamElement: FC<ValidationOfGroupDayOff> = (props) => {
  const { groupId, groupName, users } = props

  return (
    <Box key={groupId} bg="white" borderRadius="m" marginBottom="xm" padding="s" flexBasis="48%">
      <Box flexDirection="row" justifyContent="space-between">
        <Text variant="label1">{groupName}</Text>
        <Box flexDirection="row" alignItems="center">
          <IconPalm width={16} height={16} />
          <Text variant="label1" marginLeft="s">
            {qtyOnHolidayNow(users)}
          </Text>
        </Box>
      </Box>
      <Box marginTop="xm" flexDirection="row" justifyContent="space-around">
        <IconProfile width={62} height={62} />
        <IconProfile width={62} height={62} />
      </Box>
    </Box>
  )
}
