import React from 'react'
import { ModalProps, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BaseOpacity, Box, mkUseStyles, Text, Theme, useTheme } from 'utils/theme'
import IconArrowLeft from 'assets/icons/arrow-left.svg'
import IconGeolocation from 'assets/icons/icon-geolocation.svg'
import { useTranslation } from 'react-i18next'
import { CompoundLocation, useLocation } from 'hooks/useLocation'
import { useSearch } from 'hooks/useSearch'
import { CustomButton } from 'components/CustomButton'
import { SearchBar } from './SearchBar'
import { ModalLocationList } from './ModalLocationList'

export type ModalLocationPickerProps = ModalProps & {
  onLocationChange: F1<CompoundLocation>
}

const ICON_SIZE = 16

export const ModalLocationPicker = (props: ModalLocationPickerProps) => {
  const { t } = useTranslation('feed')
  const styles = useStyles()
  const { requestLocation, requestAddresses } = useLocation()
  const {
    query,
    setQuery,
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
  const theme = useTheme()

  return (
    <Modal hardwareAccelerated {...props}>
      <SafeAreaView style={styles.areaStyles}>
        <Box
          padding="l"
          paddingTop="s"
          paddingBottom="none"
          alignItems="center"
          flexDirection="row">
          <Box flexGrow={1}>
            <Text variant="displayBoldSM">{t('locations')}</Text>
          </Box>
          <BaseOpacity
            padding="l"
            top={-12}
            position="absolute"
            onPress={() => {
              props.onRequestClose?.()
            }}>
            <IconArrowLeft color={theme.colors.black} width={ICON_SIZE} height={ICON_SIZE} />
          </BaseOpacity>
        </Box>
        <Box paddingHorizontal="l" paddingTop="m">
          <SearchBar query={query} onQueryChange={setQuery} onClear={clearSearch} />
          <ModalLocationList
            locations={locations}
            onLocationPress={props.onLocationChange}
            query={query}
          />
        </Box>
        {query.length === 0 && (
          <Box
            marginTop="l"
            padding="m"
            paddingHorizontal="xxm"
            marginHorizontal="m"
            alignItems="center"
            borderRadius="l1min"
            backgroundColor="secondaryOpaque">
            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
              <Box
                height={36}
                width={36}
                marginRight="m"
                backgroundColor="tertiaryOpaque"
                justifyContent="center"
                alignItems="center"
                borderRadius="full">
                <IconGeolocation color={theme.colors.tertiary} />
              </Box>
              <Box width="80%">
                <Text variant="textBoldSM">{t('locationsAccessText')}</Text>
              </Box>
            </Box>
            <Box marginTop="m" alignSelf="flex-end" marginRight="-m">
              <CustomButton
                label={t('locationsAccessPromptText')}
                variant="tertiary"
                width={160}
                customStyle={{ backgroundColor: theme.colors.tertiary }}
                onPress={handleLocationAccess}
              />
            </Box>
          </Box>
        )}
      </SafeAreaView>
    </Modal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  areaStyles: {
    flexGrow: 1,
    backgroundColor: theme.colors.white,
  },
}))
