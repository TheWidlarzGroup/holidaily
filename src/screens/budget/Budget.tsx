import React, { useCallback } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useFetchAvailablePto } from 'hooks/useFetchAvailablePto'
import { LoadingModal } from 'components/LoadingModal'
import { AvailablePto } from './components/AvailablePto'

export const Budget = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { t } = useTranslation('budget')
  const styles = useStyles()

  const { isLoading, availablePto } = useFetchAvailablePto()

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'DashboardNavigation',
      params: {
        screen: 'Dashboard',
      },
    })
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  return (
    <SafeAreaWrapper>
      <DrawerBackArrow goBack={handleGoBack} title={t('budget')} />
      <Box paddingHorizontal="m" paddingTop="xxl">
        <Box style={[styles.section]} marginBottom="l2plus">
          <AvailablePto availablePto={availablePto} />
        </Box>
        <Box flexDirection="row">
          <Box style={styles.section} flex={1} marginRight="m">
            <Text marginTop="xxm" variant="captionText" lineHeight={14}>
              {t('took')}
            </Text>
            <Text variant="bold24" lineHeight={33} letterSpacing={0.24} marginVertical="xm">
              {t('sickDays', { number: '5' })}
            </Text>
          </Box>
          <Box style={styles.section} flex={1}>
            <Text marginTop="xxm" variant="captionText" lineHeight={14}>
              {t('sent')}
            </Text>
            <Text variant="bold24" lineHeight={33} letterSpacing={0.24} marginVertical="xm">
              {t('requests', { number: '7' })}
            </Text>
            <Text marginTop="xxm" variant="captionText" lineHeight={14}>
              {t('requestsStatus', { accepted: '6', pending: '1' })}
            </Text>
          </Box>
        </Box>
      </Box>
      <LoadingModal show={isLoading} />
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
