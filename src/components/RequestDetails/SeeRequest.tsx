import React from 'react'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back2.svg'
import { useNavigation } from '@react-navigation/native'
import { RequestsNavigationProps, RequestsNavigatorType } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { ModalHeader } from '../ModalHeader'
import { RequestDetails } from './RequestDetails'

export const SeeRequest = ({ route: { params: p } }: RequestsNavigationProps<'SeeRequest'>) => {
  const { navigate } = useNavigation<RequestsNavigatorType<'SeeRequest'>>()
  const { t } = useTranslation('seeRequest')
  const theme = useTheme()

  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
      <ModalHeader>
        <BaseOpacity
          onPress={() => navigate('StatsAndRequests')}
          marginLeft="l"
          paddingBottom="ml"
          paddingTop="lplus">
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
