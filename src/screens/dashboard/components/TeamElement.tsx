import React from 'react'
import { Box, Text, BaseOpacity, useTheme } from 'utils/theme'
import IconPalm from 'assets/icons/icon-palm.svg'
import { Avatar } from 'components/Avatar'
import { SIZE_H } from 'components/dragAndDrop/Config'
import { Team } from 'mock-api/models/mirageTypes'
import { qtyOnHolidayNow } from 'utils/functions'
import { makeUserDetails } from 'utils/userDetails'

type TeamElementProps = Team & {
  navigateToTeamScreen: F0
}

export const TeamElement = (p: TeamElementProps) => {
  const theme = useTheme()
  return (
    <Box key={p.id} height={SIZE_H}>
      <BaseOpacity
        marginBottom="m"
        borderRadius="m"
        padding="s"
        bg="white"
        flex={1}
        onPress={p.navigateToTeamScreen}>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="label1">{p.name}</Text>
          <Box flexDirection="row" alignItems="center">
            <IconPalm color={theme.colors.tertiary} width={16} height={16} />
            <Text variant="label1" marginLeft="s" color="tertiary">
              {qtyOnHolidayNow(p.users)}
            </Text>
          </Box>
        </Box>
        <Box marginTop="xm" flexDirection="row" justifyContent="space-around">
          <Avatar src={p.users[0]?.photo} userDetails={makeUserDetails(p.users[0])} />
          <Avatar src={p.users[1]?.photo} userDetails={makeUserDetails(p.users[1])} />
        </Box>
      </BaseOpacity>
    </Box>
  )
}
