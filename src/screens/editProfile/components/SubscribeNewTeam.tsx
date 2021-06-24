import React, { useEffect } from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Box, Text, theme, mkUseStyles, Theme } from 'utils/theme'
import IconBack from 'assets/icons/icon-back.svg'

export const SubscribeNewTeam = () => {
  const styles = useStyles()
  const { goBack } = useNavigation()

  const handleGoBack = () => goBack()
  useEffect(() => {
    StatusBar.setBackgroundColor(theme.colors.modalBackdrop)
    return () => StatusBar.setBackgroundColor('white')
  }, [])
  return (
    <SafeAreaWrapper>
      <Box flex={1} backgroundColor="modalBackdrop">
        <Box
          flex={1}
          backgroundColor="disabledText"
          marginTop="xm"
          borderTopRightRadius="lmin"
          borderTopLeftRadius="lmin"
          padding="l"
          style={styles.shadow}>
          <TouchableOpacity activeOpacity={0.2} onPress={handleGoBack} style={styles.backBtn}>
            <IconBack />
          </TouchableOpacity>
          <Text variant="boldBlackCenter20" marginBottom="xxxxl">
            {'Subscribe more teams'}
          </Text>
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: theme.colors.black,
    shadowRadius: 10,
    elevation: 10,
  },
  backBtn: {
    position: 'absolute',
    left: 15,
    top: 17,
    zIndex: theme.zIndices['5'],
  },
}))
