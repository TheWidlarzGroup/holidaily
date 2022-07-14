import { LocationGeocodedAddress } from 'expo-location'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Analytics } from 'services/analytics'
import { BaseOpacity, Box, Text } from 'utils/theme'

type ModalLocationListProps = {
  location: Omit<LocationGeocodedAddress, 'streetNumber'> | null
  onLocationPress: F1<Omit<LocationGeocodedAddress, 'streetNumber'>>
  query: string
}

export const ModalLocationList = (props: ModalLocationListProps) => {
  const { location, onLocationPress } = props
  const { t } = useTranslation('feed')

  useEffect(() => {
    Analytics().track('FEED_LOCATION_LIST_MODAL_OPENED')
  }, [])

  if (props.query.length < 1) return null

  return (
    <Box paddingHorizontal="xs">
      {location ? (
        <BaseOpacity
          onPress={() => onLocationPress(location)}
          paddingVertical="m"
          key={location.name}>
          <Text variant="textMD" color="black">
            {location.city}
          </Text>
          <Text variant="textMD" color="darkGrey">
            {location?.region && `${location?.region},`} {location.country}
          </Text>
        </BaseOpacity>
      ) : (
        <Box alignItems="center" padding="m">
          <Text variant="textMD" color="black">
            {t('locationNotFound')}
          </Text>
        </Box>
      )}
    </Box>
  )
}
