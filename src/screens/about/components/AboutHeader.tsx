import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box, mkUseStyles, Text } from 'utils/theme'
import IconBack from 'assets/icons/icon-back2.svg'
import { useTranslation } from 'react-i18next'

type HeaderProps = {
  onClose: F0
}
export const AboutHeader = ({ onClose }: HeaderProps) => {
  const styles = useStyles()
  const { t } = useTranslation('welcome')

  return (
    <Box
      justifyContent="space-between"
      flexDirection="row"
      paddingBottom="lplus"
      paddingHorizontal="m">
      <TouchableOpacity onPress={onClose} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
        <IconBack height={18} width={18} color={styles.arrow.color} />
      </TouchableOpacity>
      <Box>
        <Text variant="displayBoldSM">{t('about')}</Text>
      </Box>
      <Box paddingRight="l" />
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  arrow: {
    color: theme.colors.black,
  },
}))
