import React from 'react'
import { Box, Text } from 'utils/theme'
import IconProfile from 'assets/icons/icon-profile.svg'
import { UserDetails } from 'types/holidaysDataTypes'

export const OtherMateElement = (props: UserDetails) => {
  const { firstName, lastName } = props

  return (
    <Box marginVertical="s" marginRight="m" alignItems="center">
      <Box marginBottom="s">
        <IconProfile width={62} height={62} />
      </Box>
      <Text variant="holidayDate" color="black">
        {firstName}
      </Text>
      <Text variant="holidayDate" color="black">
        {lastName}
      </Text>
    </Box>
  )
}
