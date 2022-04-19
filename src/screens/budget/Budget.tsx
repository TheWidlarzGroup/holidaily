import React, { useCallback, useMemo } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { AvailablePto } from './components/AvailablePto'
import { queryClient } from '../../../App'

export const Budget = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { t } = useTranslation('budget')
  const styles = useStyles()
  const { user } = useUserContext()
  const [sentRequestsCount, sickDaysCount, accepted, pending]: number[] = useMemo(() => {
    if (!user) return [0, 0, 0, 0]
    const { requests } = user
    const sentRequestsCount = requests.length
    const sickDaysCount = requests.filter((req) => req.status === 'past' && req.isSickTime).length
    const accepted = requests.filter((req) => req.status === 'accepted').length
    const pending = requests.filter((req) => req.status === 'pending').length
    return [sentRequestsCount, sickDaysCount, accepted, pending]
  }, [user])
  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'DashboardNavigation',
      params: {
        screen: 'Dashboard',
      },
    })
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])
  queryClient.prefetchQuery({ queryFn: useGetOrganization })
  return (
    <SafeAreaWrapper>
      <DrawerBackArrow goBack={handleGoBack} title={t('budget')} />
      <Box paddingHorizontal="m" paddingTop="xxl">
        <Box style={[styles.section]} marginBottom="l2plus">
          <AvailablePto availablePto={user?.availablePto ?? 0} />
        </Box>
        <Box flexDirection="row">
          <Box style={styles.section} flex={1} marginRight="m">
            <Text marginTop="xxm" variant="captionText" lineHeight={14}>
              {t('took')}
            </Text>
            <Text variant="bold24" lineHeight={33} letterSpacing={0.24} marginVertical="xm">
              {t('sickDays', { number: sickDaysCount })}
            </Text>
          </Box>
          <Box style={styles.section} flex={1}>
            <Text marginTop="xxm" variant="captionText" lineHeight={14}>
              {t('sent')}
            </Text>
            <Text variant="bold24" lineHeight={33} letterSpacing={0.24} marginVertical="xm">
              {t('requests', { number: sentRequestsCount })}
            </Text>
            <Text marginVertical="xxm" variant="captionText" lineHeight={14}>
              {t('requestsStatus', { accepted, pending })}
            </Text>
          </Box>
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  section: {
    padding: theme.spacing.xxm,
    paddingBottom: 0,
    borderRadius: theme.borderRadii.l,
    backgroundColor: theme.colors.bottomTabBgColor,
    overflow: 'hidden',
  },
}))
