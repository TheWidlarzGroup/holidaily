import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CloseIcon from 'assets/icons/icon-close.svg'
import { Box, Text, mkUseStyles, BaseOpacity, Theme } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { useTranslation, Trans } from 'react-i18next'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'

const Background = require('assets/policy_modal_background.png')

export const PtoPolicy = () => {
  const { goBack } = useNavigation()
  const { t } = useTranslation('budget')
  const styles = useStyles()
  return (
    <SafeAreaWrapper>
      <Box flexDirection="row" alignItems="center" paddingHorizontal="s">
        <BaseOpacity onPress={goBack}>
          <CloseIcon width={50} height={50} />
        </BaseOpacity>
        <Box flex={1}>
          <Text variant="boldBlackCenter20">{t('policyHeader')}</Text>
        </Box>
      </Box>
      <Box style={[styles.policiesContainer]}>
        <Box style={[styles.policySection]}>
          <Text lineHeight={20}>
            <Trans
              ns="budget"
              i18nKey="policyOne"
              components={{ b: <Text variant={'bold16'} lineHeight={20} /> }}
            />
          </Text>
        </Box>
        <Box style={[styles.policySection]}>
          <Text lineHeight={20}>
            <Trans
              ns="budget"
              i18nKey="policyTwo"
              components={{ b: <Text variant={'bold16'} lineHeight={20} /> }}
            />
          </Text>
          <Text color="grey" fontSize={12} lineHeight={20}>
            {t('policyTwoExample')}
          </Text>
        </Box>
        <Box style={[styles.policySection]}>
          <Text lineHeight={20}>
            <Trans
              ns="budget"
              i18nKey="policyThree"
              components={{ b: <Text variant={'bold16'} lineHeight={20} /> }}
            />
          </Text>
        </Box>
      </Box>
      <FastImage style={[styles.background]} source={Background} />
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    flex: 1,
  },
  policiesContainer: {
    padding: theme.spacing.l,
    marginTop: theme.spacing.l,
  },
  policySection: {
    marginVertical: theme.spacing.m,
  },
  background: {
    flex: 1,
    overflow: 'visible',
    zIndex: theme.zIndices['-1'],
  },
}))
