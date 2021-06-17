import React from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { ValidationOfGroupDayOff } from 'types/holidaysDataTypes'
import { qtyOnHolidayNow } from 'utils/functions'
import IconPalm from 'assets/icons/icon-palm.svg'
import { Avatar } from 'components/Avatar'
import { SIZE } from 'screens/dashboard/dragAndDrop/Config'

type TeamElementProps = ValidationOfGroupDayOff & {
  id: number
  navigateToTeamScreen: () => void
  onLongPress: () => void
}

export const TeamElement = (props: TeamElementProps) => {
  const { groupId, groupName, users, navigateToTeamScreen } = props

  return (
    <Box key={groupId} width={SIZE} height={SIZE}>
      <BaseOpacity borderRadius="m" margin="m" bg="white" flex={1} onPress={navigateToTeamScreen}>
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
          <Avatar src={users[0]?.photo} />
          <Avatar src={users[1]?.photo} />
        </Box>
      </BaseOpacity>
    </Box>
  )
}
