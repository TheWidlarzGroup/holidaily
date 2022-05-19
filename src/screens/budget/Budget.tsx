import React, { useCallback } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Box, Text, Theme, useTheme } from 'utils/theme'
import GestureRecognizer from 'react-native-swipe-gestures'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import IconPill from 'assets/icons/icon-pill.svg'
import { BoxProps } from '@shopify/restyle'
import PlaneIcon from 'assets/icons/icon-paperplane.svg'
import { AvailablePto } from './components/AvailablePto'

type SentReqsSectionCount = {
  sentReqsCount: number
  acceptedReqsCount: number
  pendingReqsCount: number
}

export const Budget = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { t } = useTranslation('budget')
  const { user } = useUserContext()
  const requests = user?.requests ?? []
  const sentReqsCount = requests.length
  const sickDaysCount = requests.filter((req) => req.status === 'past' && req.isSickTime).length
  const acceptedReqsCount = requests.filter(
    (req) => req.status === 'accepted' && req.isSickTime
  ).length
  const pendingReqsCount = requests.filter(
    (req) => req.status === 'pending' && req.isSickTime
  ).length

  const handleGoBack = useCallback(() => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  return (
    <SafeAreaWrapper>
      <GestureRecognizer onSwipeRight={handleGoBack} style={{ flex: 1 }}>
        <DrawerBackArrow goBack={handleGoBack} title={t('budget')} />
        <Box paddingHorizontal="m" paddingTop="xxl">
          <AvailablePto availablePto={user?.availablePto ?? 0} />
          <Box flexDirection="row">
            <SickDaysSection sickDaysCount={sickDaysCount} />
            <SentReqsSection
              sentReqsCount={sentReqsCount}
              acceptedReqsCount={acceptedReqsCount}
              pendingReqsCount={pendingReqsCount}
            />
          </Box>
        </Box>
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}

const SentReqsSection = (p: SentReqsSectionCount) => {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Box bg="specialBrighterOpaque" borderBottomRightRadius="l1min" padding="xm" flex={1}>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="textBoldSM" lineHeight={14} color="special">
          {t('sent')}
        </Text>
        <IconWrapper bg="special" padding="s">
          <PlaneIcon color={theme.colors.alwaysWhite} />
        </IconWrapper>
      </Box>
      <SectionBoldText text={t('requests', { number: p.sentReqsCount })} />
      <Text marginVertical="xxm" variant="captionText" lineHeight={14} color="alwaysBlack">
        {t('requestsStatus', { accepted: p.acceptedReqsCount, pending: p.pendingReqsCount })}
      </Text>
    </Box>
  )
}
const IconWrapper = ({ children, ...props }: React.PropsWithChildren<BoxProps<Theme>>) => (
  <Box
    aspectRatio={1}
    justifyContent="center"
    alignItems="center"
    borderRadius="full"
    height={24}
    {...props}>
    {children}
  </Box>
)
const SickDaysSection = (p: { sickDaysCount: number }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Box
      bg="quarternaryOpaque"
      borderBottomLeftRadius="l1min"
      padding="xm"
      flex={1}
      marginRight="s">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="textBoldSM" color="quarternaryDark" lineHeight={21}>
          {t('took')}
        </Text>
        <IconWrapper bg="quarternary">
          <IconPill height={13} color={theme.colors.alwaysWhite} />
        </IconWrapper>
      </Box>
      <SectionBoldText text={t('sickDays', { number: p.sickDaysCount })} />
    </Box>
  )
}

const SectionBoldText = ({ text }: { text: string }) => (
  <Text
    variant="textBoldMD"
    lineHeight={33}
    letterSpacing={0.16}
    marginVertical="xm"
    color="alwaysBlack">
    {text}
  </Text>
)
