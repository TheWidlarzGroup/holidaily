import { CompoundLocation } from 'hooks/useLocation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text } from 'utils/theme'

type ModalLocationListProps = {
  loading: boolean
  locations: Maybe<CompoundLocation[]>
  onLocationPress: F1<CompoundLocation>
}

export const ModalLocationList = (props: ModalLocationListProps) => {
  const { loading, locations, onLocationPress } = props

  const { t } = useTranslation('feed')

  return (
    <Box paddingHorizontal="xs">
      {loading && (
        <Box alignItems="center" padding="m">
          <Text color="black">{t('loading')}</Text>
        </Box>
      )}
      {!loading &&
        locations &&
        (locations.length > 0 ? (
          locations.map((location) =>
            location.addresses.map((address) => (
              <BaseOpacity
                onPress={() => onLocationPress(location)}
                paddingVertical="m"
                key={address.name}>
                <Text variant="regular15" color="darkGreyBrighter">
                  {address.street} {address.name}, {address.city}
                </Text>
                <Text variant="labelGrey">
                  {address.region}, {address.country}
                </Text>
              </BaseOpacity>
            ))
          )
        ) : (
          <Box alignItems="center" padding="m">
            <Text color="black">{t('locationNotFound')}</Text>
          </Box>
        ))}
    </Box>
  )
}
