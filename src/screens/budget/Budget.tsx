import React from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { BaseOpacity, Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType, BudgetNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useFetchUserStats } from 'dataAccess/queries/useFetchUserStats'
import { LoadingModal } from 'components/LoadingModal'
import { useRecognizeSwipe } from 'hooks/useRecognizeSwipe'
import Animated from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Section } from './components/Section'

const AnimatedBox = Animated.createAnimatedComponent(Box)

export const Budget = () => {
  const navigation = useNavigation<AppNavigationType<'DRAWER_NAVIGATOR'>>()
  const { t } = useTranslation('budget')
  const { data: stats, isLoading: loadingStats } = useFetchUserStats()
  const { user } = useUserContext()
  const { navigate } = useNavigation<BudgetNavigationType<'BUDGET'>>()

  const handleGoBack = () => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }
  const { onTouchStart, onTouchMove } = useRecognizeSwipe(handleGoBack)

  const isLoading = loadingStats || !user || !stats
  if (isLoading) return <LoadingModal show />
  return (
    <SafeAreaWrapper>
      <PanGestureHandler onBegan={onTouchStart} onActivated={onTouchMove}>
        <AnimatedBox flex={1}>
          <DrawerBackArrow goBack={handleGoBack} title={t('budget')} />
          <BaseOpacity
            activeOpacity={0.8}
            onPress={() => navigate('PTO_POLICY')}
            paddingTop="lplus">
            <Section variant="left" duration={user.availablePto ?? 0} />
          </BaseOpacity>
          <Section variant="sick" duration={+stats.sickdaysTaken ?? 0} />
        </AnimatedBox>
      </PanGestureHandler>
    </SafeAreaWrapper>
  )
}
