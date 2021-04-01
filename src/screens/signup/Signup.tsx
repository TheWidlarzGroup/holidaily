import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { Box, Text } from '../../utils/theme/index'

import { CustomButton } from '../../components/CustomButton'

export const Signup: FC = () => (
  <SafeAreaView style={styles.container}>
    <Box flex={0.4} justifyContent="center" maxWidth={300} alignSelf="center">
      <Text variant="title1">How would you like to sign in?</Text>
    </Box>
    <Box width={200} height={200} backgroundColor="secondary" borderRadius="m" alignSelf="center" />
    <Box flex={0.6} justifyContent="center">
      <CustomButton label="Continue with Gmail" textColor="black" icon="google" />
      <CustomButton label="Continue with Slack" textColor="black" icon="slack" marginTop={16} />
      <CustomButton
        label="Sign up with E-mail"
        textColor="white"
        backgroundColor="#FF9F2D"
        marginTop={40}
      />
    </Box>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
