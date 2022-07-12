import React from 'react'
import { BaseOpacity, Box, mkUseStyles, Text, useTheme } from 'utils/theme'
import { ModalHeader } from 'components/ModalHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconBack from 'assets/icons/icon-back2.svg'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { GestureRecognizer } from 'utils/GestureRecognizer'
import { PrivacyPolicyContent } from './PrivacyPolicyContent'

export const PrivacyPolicy = () => {
  const theme = useTheme()
  const styles = useStyles()
  const { t } = useTranslation('about')
  const { goBack } = useNavigation()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.dashboardBackground,
      }}>
      <ModalHeader>
        <BaseOpacity
          onPress={goBack}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          paddingLeft="m">
          <IconBack height={18} width={18} color={styles.arrow.color} />
        </BaseOpacity>
        <Text variant="displayBoldSM">{t('privacyPolicy')}</Text>
        <Box paddingRight="xl" paddingVertical="lplus" />
      </ModalHeader>
      <GestureRecognizer onSwipeRight={goBack} onEnded>
        <PrivacyPolicyContent />
      </GestureRecognizer>
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles((theme) => ({
  arrow: {
    color: theme.colors.black,
  },
}))
