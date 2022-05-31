import React, { useEffect, useState } from 'react'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back2.svg'
import { useNavigation } from '@react-navigation/native'
import { RequestsNavigationProps, RequestsNavigatorType } from 'navigation/types'
import { useTranslation } from 'react-i18next'
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

  const goBack = () => {
    navigation.navigate(prevScreen)
  }

  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
      <ModalHeader>
        <BaseOpacity onPress={goBack} marginLeft="l" paddingBottom="ml" paddingTop="lplus">
          <IconBack width={14} height={14} color={theme.colors.black} />
        </BaseOpacity>
        <Text variant="header" color="black" fontSize={20} paddingBottom="ml" paddingTop="lplus">
          {t('yourRequest')}
        </Text>
        <Box paddingRight="xl" />
      </ModalHeader>
      <Box padding="m" flex={1}>
        <RequestDetails {...p} showStatus wasSent />
      </Box>
    </SafeAreaWrapper>
  )
}
