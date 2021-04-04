import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Dimensions } from 'react-native'
import { Box, Text, theme } from '../../utils/theme/index'

import { CustomButton } from '../../components/CustomButton'

export const Signup: FC = () => {
  const { width } = Dimensions.get('window')
  const squareDimension = width * 0.5

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={0.4} justifyContent="center" maxWidth={300}>
        <Text variant="title1">How would you like to sign in?</Text>
      </Box>
      <Box
        width={squareDimension}
        height={squareDimension}
        backgroundColor="secondary"
        borderRadius="m"
        alignSelf="center"
      />
      <Box flex={0.6} maxWidth={300} justifyContent="center" alignItems="center">
        <CustomButton label="Continue with Gmail" variant="transparent" icon="google" />
        <CustomButton
          label="Continue with Slack"
          variant="transparent"
          icon="slack"
          marginTop={theme.spacing.m}
        />
        <CustomButton label="Sign up with E-mail" variant="orange" marginTop={theme.spacing.xl} />
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
