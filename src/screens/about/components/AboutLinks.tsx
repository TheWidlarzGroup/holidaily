import React from 'react'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import StarIcon from 'assets/icons/icon-star.svg'
import ArrowRightIcon from 'assets/icons/arrow-right.svg'
import { useTranslation } from 'react-i18next'

import { linkWithFallback } from 'utils/linkWithFallback'
import { Analytics } from 'services/analytics'
import { isIos } from 'utils/layout'
import { useNavigation } from '@react-navigation/native'

const ANDROID_RATE_LINK = 'market://details?id=com.holidaily'
const APPLE_RATE_LINK = 'itms-apps://itunes.apple.com/us/app/id1572204223?mt=8'
const COMPANY_WEBSITE_LINK = 'https://thewidlarzgroup.com'

export const AboutLinks = () => {
  const theme = useTheme()
  const { t } = useTranslation('about')
  const { navigate } = useNavigation()

  return (
    <Box paddingHorizontal="m">
      <RateApp />
      <BaseOpacity
        bg="veryLightGrey"
        padding="m"
        borderRadius="lmin"
        marginTop="m"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        onPress={() => navigate('PRIVACY_POLICY')}>
        <Text variant="textBoldSM" color="titleActive">
          {t('privacyPolicy')}
        </Text>
        <ArrowRightIcon color={theme.colors.darkGreyBrighter} />
      </BaseOpacity>
    </Box>
  )
}

const RateApp = () => {
  const { t } = useTranslation('about')
  const theme = useTheme()
  return (
    <Box padding="m" bg="secondaryOpaque" borderRadius="lmin">
      <Box flexDirection="row" alignItems="center">
        <Box
          bg="tertiaryOpaque"
          alignItems="center"
          justifyContent="center"
          aspectRatio={1}
          borderRadius="full">
          <StarIcon height={35} color={theme.colors.tertiary} />
        </Box>

        <Text marginLeft="m" variant="textBoldSM" color="titleActive" style={{ flex: 1 }}>
          {t('rateApp')}
        </Text>
      </Box>
      <BaseOpacity
        paddingVertical="xm"
        paddingHorizontal="l"
        marginTop="xm"
        bg="tertiary"
        borderRadius="full"
        alignSelf="center"
        onPress={async () => {
          Analytics().track('RATE_APP_PRESSED')
          if (isIos) await linkWithFallback(APPLE_RATE_LINK, COMPANY_WEBSITE_LINK)
          else await linkWithFallback(ANDROID_RATE_LINK, COMPANY_WEBSITE_LINK)
        }}
        style={{ marginLeft: 'auto' }}>
        <Text variant="buttonSM" color="alwaysWhite">
          {t('rateAppBtn')}
        </Text>
      </BaseOpacity>
    </Box>
  )
}
