import React, { useEffect, useState } from 'react'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back2.svg'
import { useNavigation } from '@react-navigation/native'
import { RequestsNavigationProps, RequestsNavigatorType } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { StatusBar } from 'react-native'
import { Analytics } from 'services/analytics'
import { useBackHandler } from 'hooks/useBackHandler'
import { usePrevScreenBackHandler } from 'hooks/usePrevScreenBackHandler'
import { ModalHeader } from '../ModalHeader'
import { RequestDetails } from './RequestDetails'

type PrevScreen = 'NOTIFICATIONS' | 'STATS_AND_REQUESTS'

export const SeeRequest = ({ route: { params: p } }: RequestsNavigationProps<'SEE_REQUEST'>) => {
  const [prevScreen, setPrevScreen] = useState<PrevScreen>('STATS_AND_REQUESTS')
  const navigation = useNavigation<RequestsNavigatorType<'SEE_REQUEST'>>()
  const { t } = useTranslation('seeRequest')
  const theme = useTheme()

  useEffect(() => {
    const getPrevScreen = navigation.getState().routes.slice().pop()?.params?.prevScreen
    if (getPrevScreen) setPrevScreen(getPrevScreen)
  }, [navigation])

  useEffect(() => {
    Analytics().track('REQUEST_OPENED', { request: { ...p } })
  }, [p])

  usePrevScreenBackHandler(navigation, prevScreen)

  useBackHandler(() => {
    if (prevScreen) {
      navigation.navigate(prevScreen)
      return true
    }
    return false
  })

  const goBack = () => {
    navigation.navigate(prevScreen)
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
          paddingTop="lplus">
          <IconBack width={9} height={16} color={theme.colors.black} />
        </BaseOpacity>
        <Text variant="bold16" color="black" paddingBottom="ml" paddingTop="lplus">
          {t('yourRequest')}
        </Text>
        <Box paddingRight="xl" />
      </ModalHeader>
      <Box marginTop="l" paddingBottom="m" flex={1}>
        <RequestDetails {...p} showStatus wasSent />
      </Box>
    </SafeAreaWrapper>
  )
}
