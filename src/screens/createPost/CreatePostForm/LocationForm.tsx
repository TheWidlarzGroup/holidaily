import React from 'react'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import IconArrowLeft from 'assets/icons/arrow-left.svg'
import IconGeolocation from 'assets/icons/icon-geolocation.svg'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'hooks/useLocation'
import { useSearch } from 'hooks/useSearch'
import { CustomButton } from 'components/CustomButton'
import { Analytics } from 'services/analytics'
import { useNavigation } from '@react-navigation/native'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { useSetStatusBarStyle } from 'hooks/useSetStatusBarStyle'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { SearchBar } from './SearchBar'
import { ModalLocationList } from './ModalLocationList'

const ICON_SIZE = 16

export const LocationForm = ({ route }) => {
  const { t } = useTranslation('feed')
  const navigation = useNavigation()
  const { userSettings } = useUserSettingsContext()
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
  const dispatch = route?.params?.dispatch
  useSetStatusBarStyle({ darkMode: userSettings?.darkMode })

  const handleLocationAccess = async () => {
    const location = await requestLocation()
    if (!location?.position) return
    Analytics().track('FEED_LOCATION_ADDED', { location })
    dispatch({ type: 'setLocation', payload: location })
    navigation.goBack()
  }
  const theme = useTheme()

  return (
    <SafeAreaWrapper>
      <Box padding="l" paddingTop="s" paddingBottom="none" alignItems="center" flexDirection="row">
        <Box flexGrow={1}>
          <Text variant="displayBoldSM">{t('locations')}</Text>
        </Box>
        <BaseOpacity padding="l" top={-12} position="absolute" onPress={() => navigation.goBack()}>
          <IconArrowLeft color={theme.colors.black} width={ICON_SIZE} height={ICON_SIZE} />
        </BaseOpacity>
      </Box>
      <Box paddingHorizontal="l" paddingTop="m">
        <SearchBar query={query} onQueryChange={setQuery} onClear={clearSearch} />
        <ModalLocationList
          locations={locations}
          onLocationPress={(location) => {
            dispatch({ type: 'setLocation', payload: location })
            navigation.goBack()
          }}
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
              <Text variant="textBoldSM" lineHeight={21}>
                {t('locationsAccessText')}
              </Text>
            </Box>
          </Box>
          <Box marginTop="m" alignSelf="flex-end" marginRight="-xm">
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
    </SafeAreaWrapper>
  )
}
