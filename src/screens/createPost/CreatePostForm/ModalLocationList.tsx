import { CompoundLocation } from 'hooks/useLocation'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Analytics } from 'services/analytics'
import { BaseOpacity, Box, Text } from 'utils/theme'

type ModalLocationListProps = {
  locations: Maybe<CompoundLocation[]>
  onLocationPress: F1<CompoundLocation>
  query: string
}

export const ModalLocationList = (props: ModalLocationListProps) => {
  const { locations, onLocationPress } = props

  const { t } = useTranslation('feed')

  useEffect(() => {
    Analytics().track('FEED_LOCATION_LIST_MODAL_OPENED')
  }, [])

  if (props.query.length < 1) return null

  return (
    <Box paddingHorizontal="xs">
      {locations &&
        (locations.length > 0 ? (
          locations.map((location) =>
            location.addresses.map((address) => (
              <BaseOpacity
                onPress={() => onLocationPress(location)}
                paddingVertical="m"
                key={address.name}>
                <Text variant="textMD" color="black">
                  {address.city}
                </Text>
                <Text variant="textMD" color="darkGrey">
                  {address?.region && `${address?.region},`} {address.country}
                </Text>
              </BaseOpacity>
            ))
          )
        ) : (
          <Box alignItems="center" padding="m">
            <Text variant="textMD" color="black">
              {t('locationNotFound')}
            </Text>
          </Box>
        ))}
    </Box>
  )
}
