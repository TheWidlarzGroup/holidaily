import React, { useCallback, useState } from 'react'
import { ModalProps, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'

import IconArrowLeft from 'assets/icons/arrow-left.svg'
import IconGeolocation from 'assets/icons/icon-geolocation.svg'
import { useTranslation } from 'react-i18next'
import { CompoundLocation, useLocation } from 'hooks/useLocation'
import { SearchBar } from './SearchBar'

export type ModalLocationPickerProps = ModalProps & {
  onLocationChange: F1<CompoundLocation>
}

export const ModalLocationPicker = (props: ModalLocationPickerProps) => {
  const [locations, setLocations] = useState<CompoundLocation[]>([])
  const { t } = useTranslation('feed')
  const styles = useStyles()
  const { requestLocation, requestAddresses } = useLocation()

  const handleQueryLocation = useCallback(
    async (query: string) => {
      const foundLocations = await requestAddresses(query)
      setLocations(foundLocations)
    },
    [requestAddresses]
  )

  const handleLocationAccess = async () => {
    const location = await requestLocation()
    if (!location?.position) return
    props.onLocationChange(location)
  }

  return (
    <Modal hardwareAccelerated {...props}>
      <SafeAreaView style={styles.areaStyles}>
        {/* Header */}
        <Box padding="l" alignItems="center" flexDirection="row">
          <Box flexGrow={1}>
            <Text variant="body1Bold">{t('locations')}</Text>
          </Box>
          <BaseOpacity
            padding="l"
            position="absolute"
            onPress={() => {
              props.onRequestClose?.()
            }}>
            <IconArrowLeft />
          </BaseOpacity>
        </Box>
        {/* TODO: SearchBar */}
        <Box paddingHorizontal="l" paddingTop="m">
          <SearchBar
            onQueryChange={handleQueryLocation}
            onClear={() => setLocations([])}
            delay={500}
          />
          <Box paddingHorizontal="xs">
            {locations.map((location) =>
              location.addresses.map((address) => (
                <BaseOpacity paddingVertical="m" key={address.name}>
                  <Text variant="regular15">
                    {address.name}, {address.city}
                  </Text>
                  <Text variant="labelGrey">
                    {address.region}, {address.country}
                  </Text>
                </BaseOpacity>
              ))
            )}
          </Box>
        </Box>
        {/* Location Prompt Text */}
        {locations.length === 0 && (
          <Box marginTop="xxxl" paddingHorizontal="l" alignItems="center">
            <Text variant="lightGreyBold">{t('locationsAccessText')}</Text>
            <BaseOpacity flexDirection="row" padding="m" onPress={handleLocationAccess}>
              <Box paddingHorizontal="xs">
                <IconGeolocation />
              </Box>
              <Text variant="boldOrange15">{t('locationsAccessPromptText')}</Text>
            </BaseOpacity>
          </Box>
        )}
      </SafeAreaView>
    </Modal>
  )
}

const useStyles = mkUseStyles(() => ({
  areaStyles: {
    // backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
  },
}))
