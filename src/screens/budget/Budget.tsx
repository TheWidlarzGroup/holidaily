import React, { useCallback, useMemo } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import GestureRecognizer from 'react-native-swipe-gestures'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { AvailablePto } from './components/AvailablePto'

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
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  return (
    <SafeAreaWrapper>
      <GestureRecognizer onSwipeRight={handleGoBack}>
        <DrawerBackArrow goBack={handleGoBack} title={t('budget')} />
        <Box paddingHorizontal="m" paddingTop="xxl" marginHorizontal="m">
          <Box style={[styles.section]} marginBottom="l2plus">
            <AvailablePto availablePto={user?.availablePto ?? 0} />
          </Box>
          <Box flexDirection="row">
            <Box style={styles.section} flex={1} marginRight="m">
              <Text marginTop="xxm" variant="captionText" lineHeight={14} color="alwaysBlack">
                {t('took')}
              </Text>
              <SectionBoldText text={t('sickDays', { number: sickDaysCount })} />
            </Box>
            <Box style={styles.section} flex={1}>
              <Text marginTop="xxm" variant="captionText" lineHeight={14} color="alwaysBlack">
                {t('sent')}
              </Text>
              <SectionBoldText text={t('requests', { number: sentRequestsCount })} />
              <Text marginVertical="xxm" variant="captionText" lineHeight={14} color="alwaysBlack">
                {t('requestsStatus', { accepted, pending })}
              </Text>
            </Box>
          </Box>
        </Box>
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}

const SectionBoldText = ({ text }: { text: string }) => (
  <Text
    variant="textBoldMD"
    lineHeight={33}
    letterSpacing={0.16}
    marginVertical="xm"
    color="alwaysBlack">
    {text}
  </Text>
)

const useStyles = mkUseStyles((theme: Theme) => ({
  section: {
    padding: theme.spacing.xxm,
    paddingBottom: 0,
    borderRadius: theme.borderRadii.l,
    backgroundColor: theme.colors.bottomTabBgColor,
    overflow: 'hidden',
  },
}))
