import { CompoundLocation } from 'hooks/useLocation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text } from 'utils/theme'

type ModalLocationListProps = {
  locations: Maybe<CompoundLocation[]>
  onLocationPress: F1<CompoundLocation>
}

export const ModalLocationList = (props: ModalLocationListProps) => {
  const { locations, onLocationPress } = props

  const { t } = useTranslation('feed')

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
                <Text variant="regular15" color="darkGreyBrighter">
                  {address.city}
                </Text>
                <Text variant="labelGrey">
                  {address?.region && `${address?.region},`} {address.country}
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
