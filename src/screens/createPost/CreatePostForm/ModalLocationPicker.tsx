import React from 'react'
import { ModalProps, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'

import IconArrowLeft from 'assets/icons/arrow-left.svg'
import IconGeolocation from 'assets/icons/icon-geolocation.svg'
import { useTranslation } from 'react-i18next'
import { CompoundLocation, useLocation } from 'hooks/useLocation'
import { useSearch } from 'hooks/useSearch'
import { SearchBar } from './SearchBar'
import { ModalLocationList } from './ModalLocationList'

export type ModalLocationPickerProps = ModalProps & {
  onLocationChange: F1<CompoundLocation>
}

export const ModalLocationPicker = (props: ModalLocationPickerProps) => {
  const { t } = useTranslation('feed')
  const styles = useStyles()
  const { requestLocation, requestAddresses } = useLocation()
  const {
    query,
    setQuery,
    loading,
    data: locations,
    clearSearch,
  } = useSearch({
    onQueryChange: requestAddresses,
    delay: 500,
  })

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
        {/* SearchBar */}
        <Box paddingHorizontal="l" paddingTop="m">
          <SearchBar query={query} onQueryChange={setQuery} onClear={clearSearch} />
          <ModalLocationList
            locations={locations}
            onLocationPress={props.onLocationChange}
            loading={loading}
          />
        </Box>
        {/* Location Prompt */}
        {(!locations || !locations.length) && (
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
