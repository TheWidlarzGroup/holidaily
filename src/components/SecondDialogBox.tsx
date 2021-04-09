import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Box, Text } from '../utils/theme/index'
import { CustomButton } from './CustomButton'

export const SecondDialogBox: FC = () => {
  const { t } = useTranslation('modal')

  return (
    <Box backgroundColor="primary" alignItems="center" padding="lplus" borderRadius="mplus">
      <Text variant="dialog1">{t('dialogBox2Title')}</Text>
      <Box
        backgroundColor="tertiary"
        style={styles.orangeBox}
        marginVertical="xxl"
        borderRadius="xm"
      />
      <Text variant="body1">{t('dialogBox2SubTitle')}</Text>
      <Box marginTop="l" marginBottom="m">
        <CustomButton label={t('dialog2FirstButton')} variant="special" paddingVertical={5} />
      </Box>
      <Box paddingBottom="m">
        <CustomButton label={t('dialog2SecondButton')} variant="transparent" paddingVertical={5} />
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  orangeBox: {
    height: 59,
    width: 59,
  },
})
