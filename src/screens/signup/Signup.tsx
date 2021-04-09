import React, { FC, useState } from 'react'
import { Pressable, StyleSheet, Dimensions } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Box, Text, theme } from '../../utils/theme/index'
import { CustomButton } from '../../components/CustomButton'
import { CustomModal } from '../../components/CustomModal'
import { colors } from '../../utils/theme/colors'
import { FirstDialogBox } from '../../components/FirstDialogBox'
import { SecondDialogBox } from '../../components/SecondDialogBox'

export const Signup: FC = () => {
  const { width } = Dimensions.get('window')
  const squareDimension = width * 0.5
  // const navigation = useNavigation()
  const [isVisible, setIsVisible] = useState(false)

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={0.4} justifyContent="center" maxWidth={300}>
        <Text variant="title1">How would you like to sign in?</Text>
        <Pressable onPress={toggleModal}>
          <Text>Open Modal</Text>
        </Pressable>
      </Box>
      <Box
        width={squareDimension}
        height={squareDimension}
        backgroundColor="secondary"
        borderRadius="m"
        alignSelf="center"
      />
      <Box flex={0.6} justifyContent="center" marginHorizontal="xl">
        <CustomButton label="Continue with Gmail" variant="secondary" icon="google" />
        <CustomButton
          label="Continue with Slack"
          variant="secondary"
          icon="slack"
          marginTop={theme.spacing.m}
        />
        <CustomButton label="Sign up with E-mail" variant="primary" marginTop={theme.spacing.xl} />
      </Box>
      <CustomModal
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
        backdropColor={colors.modalBackground}
        animationInTiming={600}
        animationOutTiming={400}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={400}
        backdropOpacity={1}
        style={styles.modal}
        hideModalContentWhileAnimating>
        <FirstDialogBox />
      </CustomModal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.modalBackground,
    marginHorizontal: theme.spacing.l,
  },
})
