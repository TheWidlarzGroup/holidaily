import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CloseIcon from 'assets/icons/icon-close.svg'
import { Box, Text, mkUseStyles, BaseOpacity, Theme } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { useTranslation } from 'react-i18next'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { PolicySection } from './components/PolicySection'

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
      <Box padding="l" marginTop="l">
        <PolicySection textKey="policyOne" />

        <PolicySection textKey="policyTwo" subtitleKey="policyTwoExample" />

        <PolicySection textKey="policyThree" />
      </Box>
      <FastImage style={[styles.background]} source={Background} />
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  background: {
    flex: 1,
    overflow: 'visible',
    zIndex: theme.zIndices['-1'],
  },
}))
