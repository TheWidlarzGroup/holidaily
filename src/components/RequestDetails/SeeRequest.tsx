import React, { useEffect } from 'react'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back2.svg'
import { useNavigation } from '@react-navigation/native'
import { RequestsNavigationProps, RequestsNavigatorType } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { StatusBar } from 'react-native'
import { Analytics } from 'services/analytics'
import { ModalHeader } from '../ModalHeader'
import { RequestDetails } from './RequestDetails'

export const SeeRequest = ({ route: { params: p } }: RequestsNavigationProps<'SEE_REQUEST'>) => {
  const { navigate } = useNavigation<RequestsNavigatorType<'SEE_REQUEST'>>()
  const { t } = useTranslation('seeRequest')
  const theme = useTheme()

  useEffect(() => {
    Analytics().track('REQUEST_OPENED', { request: { ...p } })
  }, [p])

  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
      <StatusBar backgroundColor={theme.colors.veryLightGrey} />
      <ModalHeader>
        <BaseOpacity
          onPress={() => navigate('STATS_AND_REQUESTS')}
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
