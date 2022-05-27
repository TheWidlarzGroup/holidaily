import React from 'react'
import { Box, Text, theme } from 'utils/theme'

import IconMapLocation from 'assets/icons/icon-map-location.svg'
import { CompoundLocation } from 'hooks/useLocation'

export type LocationInfoProps = {
  location?: CompoundLocation
}

const ICON_SIZE = 13

export const LocationInfo = (props: LocationInfoProps) => {
  if (!props.location?.addresses || props.location.addresses.length === 0) return null

  const address = props.location?.addresses?.[0]

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
