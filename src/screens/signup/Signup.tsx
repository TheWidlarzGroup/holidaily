import React, { FC } from 'react'
import { Pressable, StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Box, Text, theme } from '../../utils/theme/index'
import { CustomButton } from '../../components/CustomButton'

export const Signup: FC = () => {
  const { width } = Dimensions.get('window')
  const squareDimension = width * 0.5
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={0.4} justifyContent="center" maxWidth={300}>
        <Text variant="title1">How would you like to sign in?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text>Login Screen</Text>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
