import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { getCurrentLocale } from 'utils/locale'
import { Text, Box } from 'utils/theme'
import { Languages } from '../../../../i18n'

type HelperProps = { i18nKey: keyof Languages['en']['privacyPolicy'] }

export const PrivacyPolicyContent = () => {
  const { t } = useTranslation('privacyPolicy')
  const locale = getCurrentLocale()
  const isEnglish = /eng*/.test(String(locale.code))
  return (
    <ScrollView>
      <Box paddingHorizontal="m" paddingBottom="l">
        <Text color="headerGrey" style={{ marginLeft: 'auto' }} marginTop="m">
          {t('lastUpdate', { date: isEnglish ? '15 April 2022' : '15.04.2022' })}
        </Text>
        <PolicySection i18nKey="intro" />
        <Paragraph i18nKey="p0a" />
        <Paragraph i18nKey="p0b" />
        <PolicySection i18nKey="concerns" />
        <Subtitle i18nKey="contentsTableHeading" />
        <Text variant="body1" textAlign="left" color="black">
          {t('contentsTable')}
        </Text>
        <Subtitle i18nKey="p1heading" />
        <Text textAlign="left" variant="body1Bold" marginVertical="m" color="black">
          {t('p1subheading')}
        </Text>
        <Text variant="body1" textAlign="left" color="black">
          {t('p1content1')}
        </Text>
        <PolicySection i18nKey="p1content2" />
        <Paragraph i18nKey="p1content2a" />
        <Paragraph i18nKey="p1content2b" />
        <Paragraph i18nKey="p1content2c" />
        <Paragraph i18nKey="p1sensitive" />
        <Paragraph i18nKey="p1data" />
        <Paragraph i18nKey="p1data1" />
        <Paragraph i18nKey="p1data2" />
        <Paragraph i18nKey="p1data3" />
        <Paragraph i18nKey="p1data4" />
        <Text variant="body1" textAlign="left" color="black">
          {t('p1info')}
        </Text>
        <Text textAlign="left" variant="body1Bold" marginVertical="m" color="black">
          {t('p1auto')}
        </Text>
        <Text variant="body1" textAlign="left" color="black">
          {t('p1autocontent')}
        </Text>
        <Text variant="body1" textAlign="left" marginVertical="m" color="black">
          {t('p1collect')}
        </Text>
        <Paragraph i18nKey="p1collect1" />
        <Paragraph i18nKey="p1collect2" />
        <Subtitle i18nKey="p3" />
        <Text
          fontFamily="Nunito-Italic-VariableFont_wght"
          fontSize={16}
          lineHeight={24}
          color="black">
          {t('p3italic')}
        </Text>
        <Text variant="body1" textAlign="left" color="black">
          {t('p3content')}
        </Text>
        <Paragraph i18nKey="p3a" />
        <Paragraph i18nKey="p3b" />
        <Paragraph i18nKey="p3c" />
      </Box>
    </ScrollView>
  )
}

const Subtitle = ({ i18nKey }: HelperProps) => {
  const { t } = useTranslation('privacyPolicy')
  return (
    <Box marginTop="l" marginBottom="m">
      <Text fontFamily="Nunito-Bold" fontSize={18} color="black">
        {t(i18nKey)}
      </Text>
    </Box>
  )
}

const PolicySection = ({ i18nKey, noMargin }: HelperProps & { noMargin?: true }) => (
  <Text variant="body1" textAlign="left" marginTop={noMargin ? undefined : 'l'} color="black">
    {/* @ts-ignore */}
    <Trans
      ns="privacyPolicy"
      i18nKey={i18nKey}
      components={{
        b: <Text variant="body1Bold" color="black" />,
      }}
    />
  </Text>
)

const Paragraph = ({ i18nKey }: HelperProps) => (
  <Box flexDirection="row" marginTop="l">
    <Text marginRight="s" marginLeft="m" color="black">
      ●
    </Text>
    <Box flex={1}>
      <PolicySection i18nKey={i18nKey} noMargin />
    </Box>
  </Box>
)
