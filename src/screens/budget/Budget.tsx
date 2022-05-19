import React, { useCallback } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Box } from 'utils/theme'
import GestureRecognizer from 'react-native-swipe-gestures'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { AvailablePto } from './components/AvailablePto'
import { SentReqsSection, SickDaysSection } from './components/BudgetSections'

export const Budget = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { t } = useTranslation('budget')
  const { user } = useUserContext()
  const requests = user?.requests ?? []
  const sentReqsCount = requests.length
  const sickDaysCount = requests.filter((req) => req.status === 'past' && req.isSickTime).length
  const acceptedReqsCount = requests.filter((req) => req.status === 'accepted').length
  const pendingReqsCount = requests.filter((req) => req.status === 'pending').length

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
