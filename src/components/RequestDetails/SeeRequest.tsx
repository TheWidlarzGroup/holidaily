import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back.svg'
import { useNavigation } from '@react-navigation/native'
import { RequestsNavigationProps, RequestsNavigatorType } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { ModalHeader } from '../ModalHeader'
import { RequestDetails } from './RequestDetails'

export const SeeRequest = ({ route: { params: p } }: RequestsNavigationProps<'SeeRequest'>) => {
  const { navigate } = useNavigation<RequestsNavigatorType<'SeeRequest'>>()
  const { t } = useTranslation('seeRequest')
  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
      <ModalHeader noPadding>
        <BaseOpacity onPress={() => navigate('StatsAndRequests')}>
          <IconBack width={64} height={64} />
        </BaseOpacity>
        <Text style={{ transform: [{ translateX: -16 }] }} variant="header">
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
