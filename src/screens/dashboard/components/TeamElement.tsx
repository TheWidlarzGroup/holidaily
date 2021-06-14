import React from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { ValidationOfGroupDayOff } from 'types/holidaysDataTypes'
import { qtyOnHolidayNow } from 'utils/functions'
import IconPalm from 'assets/icons/icon-palm.svg'
import IconProfile from 'assets/icons/icon-profile.svg'

type TeamElementProps = ValidationOfGroupDayOff & {
  navigateToTeamScreen: () => void
}

export const TeamElement = (props: TeamElementProps) => {
  const { groupId, groupName, users, navigateToTeamScreen } = props

  return (
    <BaseOpacity
      key={groupId}
      bg="white"
      borderRadius="m"
      marginBottom="xm"
      padding="s"
      flexBasis="48%"
      onPress={navigateToTeamScreen}>
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
    </BaseOpacity>
  )
}
