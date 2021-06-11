import React from 'react'
import { Box, Text } from 'utils/theme'
import IconProfile from 'assets/icons/icon-profile.svg'
import { UserDetails } from 'types/holidaysDataTypes'

export const OtherMateElement = (props: UserDetails) => {
  const { firstName, lastName } = props

  return (
    <Box marginVertical="m" alignItems="center" flexBasis="25%">
      <Box marginBottom="s">
        <IconProfile width={62} height={62} />
      </Box>
      <Text numberOfLines={1} variant="holidayDate" color="black">
        {firstName}
      </Text>
      <Text numberOfLines={1} variant="holidayDate" color="black">
        {lastName}
      </Text>
    </Box>
  )
}
