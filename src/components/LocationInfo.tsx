import React from 'react'
import { Box, Text, theme } from 'utils/theme'

import IconMapLocation from 'assets/icons/icon-map-location.svg'
import { LocationGeocodedAddress } from 'expo-location'

export type LocationInfoProps = {
  location?: LocationGeocodedAddress
}

const ICON_SIZE = 13

export const LocationInfo = (props: LocationInfoProps) => {
  if (!props.location) return null

  const address = props.location

  return (
    <Box flexDirection="row" alignItems="center" collapsable>
      <Box marginRight="xs">
        <IconMapLocation width={ICON_SIZE} height={ICON_SIZE} color={theme.colors.headerGrey} />
      </Box>
      <Text variant="textXS" color="headerGrey">
        {address.city && `${address.city},`} {address.country}
      </Text>
    </Box>
  )
}
