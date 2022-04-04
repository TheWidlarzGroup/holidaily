import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back.svg'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DashboardNavigationProps } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { ModalHeader } from '../ModalHeader'
import { RequestDetails } from './RequestDetails'

export const SeeRequest = ({ route: { params: p } }: DashboardNavigationProps<'SeeRequest'>) => {
  const { navigate } = useNavigation()
  const { t } = useTranslation('seeRequest')
  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
      <ModalHeader noPadding>
        <SafeAreaView
          edges={['top']}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <BaseOpacity
            onPress={() => {
              // reset params
              navigate('DashboardNavigation', { screen: 'Dashboard', params: undefined })
              navigate('Stats')
            }}>
            <IconBack width={64} height={64} />
          </BaseOpacity>
          <Text style={{ transform: [{ translateX: -16 }] }} variant="header">
            {t('yourRequest')}
          </Text>
          <Box paddingRight="xl" />
        </SafeAreaView>
      </ModalHeader>
      <Box padding="m" flex={1}>
        <RequestDetails {...p} showStatus />
      </Box>
    </SafeAreaWrapper>
  )
}
