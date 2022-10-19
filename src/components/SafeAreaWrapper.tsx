import React, { ReactNode } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { mkUseStyles, Theme, theme } from 'utils/theme'

type EdgesTypes = 'top' | 'bottom' | 'left' | 'right'

type WrapperProps = {
  isDefaultBgColor?: boolean
  isDarkBgColor?: boolean
  isTabNavigation?: boolean
  edges?: EdgesTypes[]
  children?: ReactNode
}
export const SafeAreaWrapper = ({
  isDefaultBgColor,
  isTabNavigation,
  edges,
  children,
  isDarkBgColor,
}: WrapperProps) => {
  const styles = useStyles()

  return (
    <SafeAreaView
      edges={edges || ['top', 'right', 'bottom', 'left']}
      style={[
        styles.container,
        !isDefaultBgColor && styles.containerBackground,
        isDarkBgColor && styles.darkContainerBackground,
        isTabNavigation && { paddingBottom: theme.spacing.xxxl },
      ]}>
      {children}
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    flex: 1,
  },
  containerBackground: {
    backgroundColor: theme.colors.dashboardBackgroundBrighter,
  },
  darkContainerBackground: {
    backgroundColor: theme.colors.grey,
  },
}))
