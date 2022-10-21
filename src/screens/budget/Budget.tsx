import React from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { BaseOpacity } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType, BudgetNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useFetchUserStats } from 'dataAccess/queries/useFetchUserStats'
import { GestureRecognizer } from 'utils/GestureRecognizer'
import { Section } from './components/Section'

export const Budget = () => {
  const navigation = useNavigation<AppNavigationType<'DRAWER_NAVIGATOR'>>()
  const { t } = useTranslation('budget')
  const { data: stats } = useFetchUserStats()
  const { user } = useUserContext()
  const { navigate } = useNavigation<BudgetNavigationType<'BUDGET'>>()

  const handleGoBack = () => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }

  const sickDaysTaken = stats?.sickdaysTaken ? +stats.sickdaysTaken : 0
  return (
    <SafeAreaWrapper>
      <GestureRecognizer onSwipeRight={handleGoBack}>
        <DrawerBackArrow goBack={handleGoBack} title={t('budget')} />
        <BaseOpacity activeOpacity={0.8} onPress={() => navigate('PTO_POLICY')} paddingTop="lplus">
          <Section variant="left" duration={user?.availablePto ?? 0} />
        </BaseOpacity>
        <Section variant="sick" duration={sickDaysTaken} />
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}
