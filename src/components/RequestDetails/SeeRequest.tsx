import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import IconBack from 'assets/icons/icon-back.svg'
import { useNavigation } from '@react-navigation/native'
import { DashboardNavigationProps } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { ModalHeader } from '../ModalHeader'
import { RequestDetails } from './RequestDetails'

export const SeeRequest = ({ route: { params: p } }: DashboardNavigationProps<'SeeRequest'>) => {
  const { reset } = useNavigation()
  const { t } = useTranslation('seeRequest')
  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
      <ModalHeader noPadding>
        <BaseOpacity
          onPress={() => {
            reset({
              index: 1,
              routes: [
                { name: 'DashboardNavigation', params: { screen: 'Dashboard' } },
                { name: 'Stats' },
              ],
            })
          }}>
          <IconBack width={64} height={64} />
        </BaseOpacity>
        <Text style={{ transform: [{ translateX: -16 }] }} variant="header">
          {t('yourRequest')}
        </Text>
        <Box paddingRight="xl" />
      </ModalHeader>
      <Box padding="m" flex={1}>
        <RequestDetails {...p} showStatus />
      </Box>
    </SafeAreaWrapper>
  )
}
