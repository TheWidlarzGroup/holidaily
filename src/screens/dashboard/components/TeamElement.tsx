import React from 'react'
import { Box, Text, BaseOpacity, useTheme } from 'utils/theme'
import IconPalm from 'assets/icons/icon-palm.svg'
import { Avatar } from 'components/Avatar'
import { SIZE_W, SIZE_H } from 'screens/dashboard/dragAndDrop/Config'
import { Team } from 'mock-api/models/mirageTypes'
import { qtyOnHolidayNow } from 'utils/functions'

type TeamElementProps = Team & {
  navigateToTeamScreen: F0
}

export const TeamElement = (props: TeamElementProps) => {
  const { id, name, users, navigateToTeamScreen } = props
  const theme = useTheme()
  return (
    <Box key={id} width={SIZE_W} height={SIZE_H}>
      <BaseOpacity
        borderRadius="m"
        margin="s"
        padding="s"
        bg="white"
        flex={1}
        onPress={navigateToTeamScreen}>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="label1">{name}</Text>
          <Box flexDirection="row" alignItems="center">
            <IconPalm color={theme.colors.black} width={16} height={16} />
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
