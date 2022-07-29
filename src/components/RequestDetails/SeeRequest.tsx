import React, { useEffect } from 'react'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back2.svg'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RequestsNavigationProps, RequestsNavigatorType, RequestsRoutes } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { StatusBar } from 'react-native'
import { Analytics } from 'services/analytics'
import { PrevScreen, usePrevScreenBackHandler } from 'hooks/usePrevScreenBackHandler'
import { GestureRecognizer } from 'utils/GestureRecognizer'
import { ModalHeader } from '../ModalHeader'
import { RequestDetails } from './RequestDetails'

export const SeeRequest = ({ route: { params: p } }: RequestsNavigationProps<'SEE_REQUEST'>) => {
  const navigation = useNavigation<RequestsNavigatorType<'SEE_REQUEST'>>()
  const { t } = useTranslation('seeRequest')
  const route = useRoute<RouteProp<RequestsRoutes, 'SEE_REQUEST'>>()
  const theme = useTheme()

  useEffect(() => {
    Analytics().track('REQUEST_OPENED', { request: { ...p } })
  }, [p])

  const prevScreen: PrevScreen = route.params?.prevScreen
  usePrevScreenBackHandler(prevScreen, true)

  useEffect(() => {
    const parent = navigation.getParent()?.getParent()

    if (prevScreen && ['NOTIFICATIONS'].includes(prevScreen)) {
      parent?.setOptions({ swipeEnabled: false })
    }
  }, [navigation, prevScreen])

  const goBack = () => {
    navigation.navigate(prevScreen || 'STATS_AND_REQUESTS')
  }

  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
      <StatusBar backgroundColor={theme.colors.veryLightGrey} />
      <ModalHeader>
        <BaseOpacity
          onPress={goBack}
          hitSlop={{ top: 24, right: 24, bottom: 24, left: 24 }}
          marginLeft="ml"
          paddingBottom="ml"
          paddingTop="ml">
          <IconBack width={9} height={16} color={theme.colors.black} />
        </BaseOpacity>
        <Text variant="bold16" color="black" paddingBottom="ml" paddingTop="ml">
          {t('yourRequest')}
        </Text>
        <Box paddingRight="xl" />
      </ModalHeader>
      <GestureRecognizer
        onSwipeRight={goBack}
        style={{ marginTop: theme.spacing.l, paddingBottom: theme.spacing.m }}>
        <RequestDetails {...p} showStatus wasSent />
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}
