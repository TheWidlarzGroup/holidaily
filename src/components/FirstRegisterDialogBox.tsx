import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Box, Text } from '../utils/theme/index'

export const FirstRegisterDialogBox: FC = () => {
  const { t } = useTranslation('modal')

  return (
    <Box backgroundColor="primary" alignItems="center" padding="lplus" borderRadius="mplus">
      <Text variant="dialog1">{t('dialogBox1Title')}</Text>
      <Box
        backgroundColor="tertiary"
        style={styles.orangeBox}
        marginVertical="xl"
        borderRadius="xm"
      />
      <Text variant="body1">{t('dialogBox1SubTitle')}</Text>
    </Box>
  )
}

const styles = StyleSheet.create({
  orangeBox: {
    height: 59,
    width: 59,
  },
})
