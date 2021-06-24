import React from 'react'
import { Box, Text } from 'utils/theme'
import { MateHolidaysData } from 'types/holidaysDataTypes'
import { Avatar } from 'components/Avatar'

type OtherMateElementProps = MateHolidaysData

export const OtherMateElement = (props: OtherMateElementProps) => {
  const { firstName, lastName, photo } = props

  return (
    <Box marginVertical="m" alignItems="center" flexBasis="25%">
      <Box marginBottom="s">
        <Avatar src={photo} />
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
