import React, { useEffect, useState } from 'react'
import { StatusBar, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { CustomButton } from 'components/CustomButton'
import { Box, Text, theme, mkUseStyles, Theme } from 'utils/theme'
import { TEAMS } from 'utils/mocks/teamsMocks'
import IconBack from 'assets/icons/icon-back.svg'
import IconSearch from 'assets/icons/icon-search.svg'

export const SubscribeNewTeam = () => {
  const styles = useStyles()
  const { goBack } = useNavigation()
  const [searchPhrase, setSearchPhrase] = useState<string>('')

  const handleSubscriptionSubmit = () => console.log('submit')

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
          <Text variant="boldBlackCenter20">{'Subscribe more teams'}</Text>
          <Box position="relative" marginTop="lplus">
            <TextInput
              style={styles.searchInput}
              onChangeText={setSearchPhrase}
              value={searchPhrase}
            />
            <IconSearch style={styles.searchIcon} />
          </Box>
          <Box flexDirection="row" flexWrap="wrap" marginTop="xxl">
            {TEAMS.map(({ teamName, id }) => (
              <RectButton key={id} style={styles.teamItem}>
                <Text variant="bold15">{teamName}</Text>
              </RectButton>
            ))}
          </Box>
          <Box position="absolute" bottom={16} alignSelf="center">
            <CustomButton
              label={'Subscribe'}
              variant="primary"
              onPress={handleSubscriptionSubmit}
              width={221}
              height={53}
            />
          </Box>
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
  searchIcon: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  searchInput: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    height: 36,
    borderRadius: theme.borderRadii.xxl,
    paddingHorizontal: theme.spacing.m,
    paddingLeft: theme.spacing.xxl,
  },
  teamItem: {
    backgroundColor: theme.colors.white,
    marginTop: theme.spacing.m,
    marginRight: theme.spacing.xm,
    paddingHorizontal: theme.spacing.ml,
    paddingVertical: theme.spacing.xm,
    borderRadius: theme.borderRadii.xxl,
  },
}))
