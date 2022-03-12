import React, { FC, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import Info from 'assets/icons/icon-info.svg'
// TODO:This should come from backend as an internal company policy
const PTO_LIMIT = 26

export const Budget: FC = () => {
  const navigation = useNavigation<AppNavigationType<'DrawerNavigator'>>()
  const { t } = useTranslation('budget')
  const styles = useStyles()
  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'DashboardNavigation',
      params: {
        screen: 'Dashboard',
      },
    })
  }, [navigation])

  return (
    <SafeAreaWrapper>
      <DrawerBackArrow goBack={handleGoBack} title={t('budget')} />
      <Box paddingHorizontal="m" paddingTop="xxl">
        <Box style={[styles.section]} marginBottom="l2plus">
          <Info style={[styles.infoIcon]} />
          <Text marginTop="xxm" variant="captionText" lineHeight={14}>
            {t('have')}
          </Text>
          <Text marginVertical="xxm" variant="bold24" color="tertiary">
            {t('left', { number: '14' })}
          </Text>
          <Text marginBottom="xm" variant="lightGreyRegular">
            {t('of', { number: String(PTO_LIMIT) })}
          </Text>
          <Box style={[styles.progress]} />
          <Box style={[styles.progressBar]} />
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
  progress: {
    width: `${(14 / PTO_LIMIT) * 100}%`,
    borderRadius: theme.borderRadii.s,
    height: theme.spacing.xs,
    backgroundColor: theme.colors.tertiary,
    zIndex: theme.zIndices['2'],
    transform: [
      {
        translateY: 4,
      },
    ],
  },
  progressBar: {
    width: '100%',
    height: theme.spacing.xs,
    backgroundColor: theme.colors.headerGrey,
  },
  infoIcon: {
    position: 'absolute',
    right: 0,
    color: theme.colors.headerGrey,
  },
}))
