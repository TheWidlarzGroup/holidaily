import React, { FC } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { colors } from '../utils/theme/colors'
import { Box } from '../utils/theme/index'

export const RecoveryCodeInput: FC = () => {
  console.log('xd')
  return (
    <Box
      backgroundColor="disabledText"
      justifyContent="center"
      borderRadius="xxl"
      flexDirection="row">
      <Box paddingHorizontal="s" flexDirection="row" alignItems="center">
        <TextInput style={styles.input} maxLength={1} />
        <TextInput style={styles.input} maxLength={1} />
        <TextInput style={styles.input} maxLength={1} />
      </Box>
      <Box paddingHorizontal="s" flexDirection="row" alignItems="center">
        <TextInput style={styles.input} maxLength={1} />
        <TextInput style={styles.input} maxLength={1} />
        <TextInput style={styles.input} maxLength={1} />
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 10,
    width: 10,
    borderRadius: 10,
    margin: 12,
    color: colors.tertiary,
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    backgroundColor: colors.tertiary,
  },
})
