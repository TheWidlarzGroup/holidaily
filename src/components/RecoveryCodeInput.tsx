import React, { FC, useState } from 'react'

import { StyleSheet } from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { colors } from '../utils/theme/colors'
import { Text, theme } from 'utils/theme/index'

type RecoveryCodeInputProps = {
  cellCount: number
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const RecoveryCodeInput: FC<RecoveryCodeInputProps> = ({ cellCount, value, setValue }) => {
  const codeFieldRef = useBlurOnFulfill({ value, cellCount })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  return (
    <CodeField
      {...props}
      value={value}
      ref={codeFieldRef}
      onChangeText={setValue}
      keyboardType="number-pad"
      cellCount={cellCount}
      textContentType="oneTimeCode"
      rootStyle={styles.codeFieldRoot}
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          fontSize={24}
          lineHeight={38}
          textAlign="center"
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  )
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: theme.spacing.xxl,
    backgroundColor: colors.disabledText,
    borderRadius: theme.borderRadii.l,
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    alignItems: 'center',
  },
  cell: {
    width: 40,
    height: 40,
  },
  focusCell: {
    borderColor: '#000',
  },
})
