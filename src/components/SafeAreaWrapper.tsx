import React, { FC } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { colors } from 'utils/theme/colors'
import { theme } from 'utils/theme'

type EdgesTypes = 'top' | 'bottom' | 'left' | 'right'

type WrapperProps = {
  isDefaultBgColor?: boolean
  isTabNavigation?: boolean
  edges?: EdgesTypes[]
}
export const SafeAreaWrapper: FC<WrapperProps> = ({
  isDefaultBgColor,
  isTabNavigation,
  edges,
  children,
}) => (
  <SafeAreaView
    edges={edges || ['top', 'right', 'bottom', 'left']}
    style={[
      styles.container,
      !isDefaultBgColor && styles.containerBackground,
      isTabNavigation && { paddingBottom: theme.spacing.xxxl },
    ]}>
    {children}
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBackground: {
    backgroundColor: colors.white,
  },
})
