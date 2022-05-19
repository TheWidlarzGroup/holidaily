import React from 'react'
import { Box, Text } from 'utils/theme'

import IconMapLocation from 'assets/icons/icon-map-location.svg'
import { CompoundLocation } from 'hooks/useLocation'

export type LocationInfoProps = {
  location?: CompoundLocation
}

export const LocationInfo = (props: LocationInfoProps) => {
  if (!props.location?.addresses || props.location.addresses.length === 0) return null

  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center" collapsable>
      <Box marginRight="xs">
        <IconMapLocation width={10} height={10} />
      </Box>
      <Text variant="regularNeutralGrey10">
        {props.location.addresses?.[0].street} {props.location.addresses?.[0].name},{' '}
        {props.location.addresses?.[0].city}
      </Text>
    </Box>
  )
}
