import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { ModalNavigationProps } from 'navigation/types'
import IconBack from 'assets/icons/icon-back.svg'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { ModalHeader } from '../ModalHeader'
import { RequestDetails } from './RequestDetails'

export const SeeRequestModal = ({ route: { params: p } }: ModalNavigationProps<'SeeRequest'>) => {
  const { goBack } = useNavigation()
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
          <BaseOpacity onPress={goBack}>
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
