import React from 'react'
import { Box, Text } from 'utils/theme'
import { Image } from 'react-native'
import IconProfile from 'assets/icons/icon-profile.svg'
import { MateHolidaysData } from 'types/holidaysDataTypes'

type OtherMateElementProps = MateHolidaysData

export const OtherMateElement = (props: OtherMateElementProps) => {
  const { firstName, lastName, picture } = props

  return (
    <Box marginVertical="m" alignItems="center" flexBasis="25%">
      <Box marginBottom="s">
        {picture ? <Image source={{ uri: picture }} /> : <IconProfile width={62} height={62} />}
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
